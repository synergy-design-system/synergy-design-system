/**
 * Collector for styles package-level setup metadata.
 */

import { access, readFile, readdir } from 'node:fs/promises';
import {
  basename, join, relative, resolve,
} from 'node:path';
import { type Result, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type StylesConfig } from './types.js';

type StylesPackageJson = {
  exports?: Record<string, unknown>;
  name?: string;
  version?: string;
};

export interface StylesRaw {
  exportKeys: string[];
  moduleEntries: StylesModuleEntry[];
  packageName: string;
  packageVersion: string;
  setupSources: string[];
}

export interface StylesModuleEntry {
  moduleName: string;
  sourceFiles: string[];
}

const collectRelativeCssFiles = async (repoRoot: string, baseDir: string): Promise<string[]> => {
  const files: string[] = [];

  try {
    const entries = await readdir(baseDir, { withFileTypes: true });

    await Promise.all(entries.map(async (entry) => {
      const absolutePath = join(baseDir, entry.name);
      if (entry.isDirectory()) {
        const nested = await collectRelativeCssFiles(repoRoot, absolutePath);
        files.push(...nested);
        return;
      }

      if (entry.isFile() && entry.name.endsWith('.css')) {
        files.push(relative(repoRoot, absolutePath));
      }
    }));
  } catch {
    return [];
  }

  return files.sort();
};

const applyModuleIndexRule = (sourceFiles: string[]): string[] => {
  if (sourceFiles.length <= 1) {
    return sourceFiles;
  }

  return sourceFiles.filter((sourcePath) => basename(sourcePath) !== 'index.css').sort();
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
  config: StylesConfig,
  ctx: Context,
): Promise<Result<StylesRaw, CollectError>> => {
  ctx.logger?.info('StylesCollector: collecting setup metadata and style modules');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const packageRoot = join(repoRoot, config.packagePath);
  const packageJsonPath = join(packageRoot, 'package.json');
  const stylesSourceRoot = join(packageRoot, 'src');

  try {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as StylesPackageJson;

    const setupSources = [
      await toOptionalRelativePath(repoRoot, packageRoot, 'README.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'CHANGELOG.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'BREAKING_CHANGES.md'),
      relative(repoRoot, packageJsonPath),
    ].filter((value): value is string => typeof value === 'string');

    const moduleDirs = await readdir(stylesSourceRoot, { withFileTypes: true });
    const moduleEntries = await Promise.all(moduleDirs
      .filter((entry) => entry.isDirectory())
      .map(async (entry): Promise<StylesModuleEntry | undefined> => {
        const moduleName = entry.name;
        const moduleRoot = join(stylesSourceRoot, moduleName);
        const sourceFiles = applyModuleIndexRule(await collectRelativeCssFiles(repoRoot, moduleRoot));

        if (sourceFiles.length === 0) {
          return undefined;
        }

        return {
          moduleName,
          sourceFiles,
        };
      }));

    return ok({
      exportKeys: Object.keys(packageJson.exports ?? {}).sort(),
      moduleEntries: moduleEntries
        .filter((entry): entry is StylesModuleEntry => entry !== undefined)
        .sort((a, b) => a.moduleName.localeCompare(b.moduleName)),
      packageName: packageJson.name ?? '@synergy-design-system/styles',
      packageVersion: packageJson.version ?? 'unknown',
      setupSources,
    });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect styles package metadata', 'styles', {
        cause: error instanceof Error ? error.message : String(error),
        packageJsonPath,
      }),
      ok: false,
    };
  }
};
