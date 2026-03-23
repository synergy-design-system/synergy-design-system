/**
 * Collector for assets package-level setup metadata.
 */

import { access, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { type Result, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type AssetsConfig } from './types.js';

type AssetsPackageJson = {
  exports?: Record<string, unknown>;
  name?: string;
  version?: string;
};

export interface AssetsRaw {
  exportKeys: string[];
  packageName: string;
  packageVersion: string;
  sources: string[];
}

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
  ctx.logger?.info('AssetsCollector: collecting package-level metadata');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const packageRoot = join(repoRoot, config.packagePath);
  const packageJsonPath = join(packageRoot, 'package.json');

  try {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as AssetsPackageJson;

    const sources = [
      await toOptionalRelativePath(repoRoot, packageRoot, 'README.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'CHANGELOG.md'),
      await toOptionalRelativePath(repoRoot, packageRoot, 'BREAKING_CHANGES.md'),
      relative(repoRoot, packageJsonPath),
    ].filter((value): value is string => typeof value === 'string');

    return ok({
      exportKeys: Object.keys(packageJson.exports ?? {}).sort(),
      packageName: packageJson.name ?? '@synergy-design-system/assets',
      packageVersion: packageJson.version ?? 'unknown',
      sources,
    });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect assets package metadata', 'assets', {
        cause: error instanceof Error ? error.message : String(error),
        packageJsonPath,
      }),
      ok: false,
    };
  }
};
