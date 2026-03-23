/**
 * Collector for tokens package-level setup metadata.
 */

import { access, readFile, readdir } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { type Result, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type TokensConfig } from './types.js';

type TokensPackageJson = {
  exports?: Record<string, unknown>;
  name?: string;
  version?: string;
};

export interface TokensRaw {
  distSources: string[];
  exportKeys: string[];
  figmaVariableSources: string[];
  packageName: string;
  packageVersion: string;
  setupSources: string[];
}

const collectRelativeFiles = async (
  repoRoot: string,
  baseDir: string,
  filter?: (absolutePath: string) => boolean,
): Promise<string[]> => {
  const files: string[] = [];

  try {
    const entries = await readdir(baseDir, { withFileTypes: true });

    await Promise.all(entries.map(async (entry) => {
      const absolutePath = join(baseDir, entry.name);
      if (entry.isDirectory()) {
        const nestedFiles = await collectRelativeFiles(repoRoot, absolutePath, filter);
        files.push(...nestedFiles);
        return;
      }

      if (!entry.isFile()) {
        return;
      }

      if (filter && !filter(absolutePath)) {
        return;
      }

      files.push(relative(repoRoot, absolutePath));
    }));
  } catch {
    return [];
  }

  return files.sort();
};

const removeTokenConvenienceThemeAliases = (sourcePaths: string[]): string[] => {
  const basenamesByDir = new Map<string, Set<string>>();

  for (const sourcePath of sourcePaths) {
    const dir = dirname(sourcePath);
    const file = basename(sourcePath);
    const inDir = basenamesByDir.get(dir);
    if (inDir) {
      inDir.add(file);
    } else {
      basenamesByDir.set(dir, new Set([file]));
    }
  }

  return sourcePaths.filter((sourcePath) => {
    const dir = dirname(sourcePath);
    const file = basename(sourcePath);
    const inDir = basenamesByDir.get(dir) ?? new Set<string>();

    // light.css and dark.css are convenience aliases for sick2025_* variants.
    if (file === 'light.css' && (inDir.has('sick2025_light.css') || inDir.has('sick2025-light.css'))) {
      return false;
    }

    if (file === 'dark.css' && (inDir.has('sick2025_dark.css') || inDir.has('sick2025-dark.css'))) {
      return false;
    }

    return true;
  }).sort();
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
  config: TokensConfig,
  ctx: Context,
): Promise<Result<TokensRaw, CollectError>> => {
  ctx.logger?.info('TokensCollector: collecting package-level metadata');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const packageRoot = join(repoRoot, config.packagePath);
  const packageJsonPath = join(packageRoot, 'package.json');
  const distRoot = join(packageRoot, 'dist');
  const figmaVariableOutputRoot = join(packageRoot, 'src', 'figma-variables', 'output');

  try {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as TokensPackageJson;

    const [rawDistSources, figmaVariableSources] = await Promise.all([
      collectRelativeFiles(repoRoot, distRoot),
      collectRelativeFiles(repoRoot, figmaVariableOutputRoot, (absolutePath) => absolutePath.endsWith('.json')),
    ]);
    const distSources = removeTokenConvenienceThemeAliases(rawDistSources);

    const setupSources = [
      await toOptionalRelativePath(repoRoot, packageRoot, 'README.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'CHANGELOG.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'BREAKING_CHANGES.md'),
      relative(repoRoot, packageJsonPath),
    ].filter((value): value is string => typeof value === 'string');

    return ok({
      distSources,
      exportKeys: Object.keys(packageJson.exports ?? {}).sort(),
      figmaVariableSources,
      packageName: packageJson.name ?? '@synergy-design-system/tokens',
      packageVersion: packageJson.version ?? 'unknown',
      setupSources: [...new Set(setupSources)].sort(),
    });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect tokens package metadata', 'tokens', {
        cause: error instanceof Error ? error.message : String(error),
        packageJsonPath,
      }),
      ok: false,
    };
  }
};
