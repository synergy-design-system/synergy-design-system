/**
 * Collector for assets package-level setup metadata and asset artifact entities.
 *
 * Collects icon names, logo filenames, and system-icon filenames by reading
 * directory listings from the assets package source. SVG content is never
 * copied to data/layers - only filenames are stored in entity custom metadata.
 * JS source files (the runtime exports) are included as sources.
 */

import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { type Context } from '../../core/context.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Result, ok } from '../../core/result.js';
import { type AssetsConfig } from './types.js';

type AssetsPackageJson = {
  exports?: Record<string, unknown>;
  name?: string;
  version?: string;
};

type MaterialSymbolIcon = {
  categories?: string[];
  name?: string;
  tags?: string[];
};

type MaterialSymbolsMetadata = {
  icons?: MaterialSymbolIcon[];
};

export interface AssetsRaw {
  exportKeys: string[];
  materialMetadataSourcePath?: string;
  packageName: string;
  packageVersion: string;
  setupSources: string[];
  sick2018IconNames: string[];
  sick2018JsSourcePath: string;
  sick2018LogoFiles: string[];
  sick2018SystemIconFiles: string[];
  sick2025FillIconNames: string[];
  sick2025FillJsSourcePath: string;
  sick2025LogoFiles: string[];
  sick2025OutlineIconNames: string[];
  sick2025OutlineJsSourcePath: string;
  sick2025SystemIconFiles: string[];
  taxonomyByIconName: ReadonlyMap<string, { categories: string[]; tags: string[] }>;
}

const collectSvgBasenames = async (dir: string): Promise<string[]> => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
};

const stripFillSuffix = (filename: string): string => (filename.endsWith('_fill.svg')
  ? filename.slice(0, -'_fill.svg'.length)
  : filename.slice(0, -'.svg'.length));

const stripSvgExtension = (filename: string): string => (filename.endsWith('.svg')
  ? filename.slice(0, -'.svg'.length)
  : filename);

const normalizeStringArray = (values: string[] | undefined): string[] => {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => value.trim());
};

const loadMaterialTaxonomy = async (
  materialMetadataPath: string,
): Promise<ReadonlyMap<string, { categories: string[]; tags: string[] }>> => {
  try {
    const metadata = JSON.parse(await readFile(materialMetadataPath, 'utf8')) as MaterialSymbolsMetadata;
    const icons = Array.isArray(metadata.icons) ? metadata.icons : [];

    const taxonomyByIconName = new Map<string, { categories: string[]; tags: string[] }>();
    for (const icon of icons) {
      if (!icon || typeof icon.name !== 'string' || icon.name.trim().length === 0) {
        continue;
      }

      taxonomyByIconName.set(icon.name, {
        categories: normalizeStringArray(icon.categories),
        tags: normalizeStringArray(icon.tags),
      });
    }

    return taxonomyByIconName;
  } catch {
    return new Map<string, { categories: string[]; tags: string[] }>();
  }
};

const toOptionalRelativePath = async (
  repoRoot: string,
  packageRoot: string,
  filePath: string,
): Promise<string | undefined> => {
  const absolute = join(packageRoot, filePath);

  try {
    await access(absolute);
    return relative(repoRoot, absolute);
  } catch {
    return undefined;
  }
};

export const collect = async (
  config: AssetsConfig,
  ctx: Context,
): Promise<Result<AssetsRaw, CollectError>> => {
  ctx.logger?.info('AssetsCollector: collecting package-level and artifact metadata');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const packageRoot = join(repoRoot, config.packagePath);
  const packageJsonPath = join(packageRoot, 'package.json');
  const srcRoot = join(packageRoot, 'src');
  const materialMetadataPath = join(repoRoot, 'packages', 'docs', 'src', 'materialSymbolsMetadata.json');

  try {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as AssetsPackageJson;

    const setupSources = [
      await toOptionalRelativePath(repoRoot, packageRoot, 'README.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'CHANGELOG.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'BREAKING_CHANGES.md'),
      relative(repoRoot, packageJsonPath),
    ].filter((value): value is string => typeof value === 'string');

    const [
      sick2018IconFiles,
      sick2025FillIconFiles,
      sick2025OutlineIconFiles,
      sick2018LogoFiles,
      sick2025LogoFiles,
      sick2018SystemIconFiles,
      sick2025SystemIconFiles,
    ] = await Promise.all([
      collectSvgBasenames(join(srcRoot, 'sick2018', 'icons')),
      collectSvgBasenames(join(srcRoot, 'sick2025', 'icons', 'fill')),
      collectSvgBasenames(join(srcRoot, 'sick2025', 'icons', 'outline')),
      collectSvgBasenames(join(srcRoot, 'sick2018', 'logos')),
      collectSvgBasenames(join(srcRoot, 'sick2025', 'logos')),
      collectSvgBasenames(join(srcRoot, 'sick2018', 'system-icons')),
      collectSvgBasenames(join(srcRoot, 'sick2025', 'system-icons')),
    ]);

    const sick2018IconNames = sick2018IconFiles.map(stripSvgExtension);
    const sick2025FillIconNames = sick2025FillIconFiles.map(stripFillSuffix);
    const sick2025OutlineIconNames = sick2025OutlineIconFiles.map(stripSvgExtension);

    const sick2018JsSourcePath = relative(repoRoot, join(srcRoot, 'sick2018', 'js', 'index.ts'));
    const sick2025FillJsSourcePath = relative(repoRoot, join(srcRoot, 'sick2025', 'js', 'filled.ts'));
    const sick2025OutlineJsSourcePath = relative(repoRoot, join(srcRoot, 'sick2025', 'js', 'outline.ts'));

    const taxonomyByIconName = await loadMaterialTaxonomy(materialMetadataPath);
    if (taxonomyByIconName.size === 0) {
      ctx.logger?.warn('AssetsCollector: material icon taxonomy unavailable; icon category/tag enrichment skipped');
    }

    const materialMetadataSourcePath = taxonomyByIconName.size > 0
      ? relative(repoRoot, materialMetadataPath)
      : undefined;

    return ok({
      exportKeys: Object.keys(packageJson.exports ?? {}).sort(),
      materialMetadataSourcePath,
      packageName: packageJson.name ?? '@synergy-design-system/assets',
      packageVersion: packageJson.version ?? 'unknown',
      setupSources,
      sick2018IconNames,
      sick2018JsSourcePath,
      sick2018LogoFiles,
      sick2018SystemIconFiles,
      sick2025FillIconNames,
      sick2025FillJsSourcePath,
      sick2025LogoFiles,
      sick2025OutlineIconNames,
      sick2025OutlineJsSourcePath,
      sick2025SystemIconFiles,
      taxonomyByIconName,
    });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect assets metadata', 'assets', {
        cause: error instanceof Error ? error.message : String(error),
        packageJsonPath,
      }),
      ok: false,
    };
  }
};
