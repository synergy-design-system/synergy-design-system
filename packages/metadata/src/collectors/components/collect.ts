/**
 * Placeholder collector for components.
 *
 * First pass:
 * - Read component manifest from packages/components/dist/custom-elements.json
 * - Resolve source files from packages/components/src/components/<tagNameWithoutPrefix>
 * - Keep scraped docs out of scope for now
 */
import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import type { CustomElementDeclaration, Module } from 'custom-elements-manifest/schema.d.ts';
import { type Result, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type ComponentsConfig } from './types.js';

/**
 * Raw component data from source files.
 */
export interface ComponentRaw {
  entries: ComponentRawEntry[];
}

export interface ComponentRawEntry {
  componentName: string;
  dependencies: string[];
  since: string;
  sourceModulePath: string;
  sourceFiles: string[];
  status: 'stable' | 'beta' | 'experimental' | 'deprecated';
  summary: string;
}

type ComponentsManifest = {
  modules?: Module[];
};

type SynCustomElementDeclaration = CustomElementDeclaration & {
  tagName: string;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const getStringField = (value: unknown, key: string): string | undefined => {
  if (!isObjectRecord(value)) {
    return undefined;
  }

  const field = value[key];
  return typeof field === 'string' ? field : undefined;
};

const getStringArrayField = (value: unknown, key: string): string[] => {
  if (!isObjectRecord(value)) {
    return [];
  }

  const field = value[key];
  if (!Array.isArray(field)) {
    return [];
  }

  return field.filter((item): item is string => typeof item === 'string');
};

const isSynCustomElementDeclaration = (
  declaration: unknown,
): declaration is SynCustomElementDeclaration => {
  if (!isObjectRecord(declaration)) {
    return false;
  }

  return declaration.kind === 'class' && typeof declaration.tagName === 'string';
};

const toStatus = (
  value: string | undefined,
): 'stable' | 'beta' | 'experimental' | 'deprecated' => {
  if (value === 'beta' || value === 'experimental' || value === 'deprecated') {
    return value;
  }

  return 'stable';
};

/**
 * Collector function: gather component metadata from source.
 * (Currently a stub that returns empty)
 */
export const collect = async (
  config: ComponentsConfig,
  ctx: Context,
): Promise<Result<ComponentRaw, CollectError>> => {
  ctx.logger?.info('ComponentsCollector: collecting from components manifest');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const componentsRoot = join(repoRoot, config.packagePath);
  const manifestPath = join(componentsRoot, 'dist', 'custom-elements.json');
  const componentsSourceRoot = join(componentsRoot, 'src', 'components');

  try {
    await access(manifestPath);
  } catch {
    return {
      error: createCollectError(
        'Components manifest missing. Build components package first (pnpm --filter @synergy-design-system/components build).',
        'components',
        {
          manifestPath,
        },
      ),
      ok: false,
    };
  }

  try {
    const manifestRaw = await readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestRaw) as ComponentsManifest;

    const componentDeclarations = (manifest.modules ?? [])
      .flatMap((module) => {
        const modulePath = module.path ?? '';

        return (module.declarations ?? [])
          .filter(
            (declaration): declaration is SynCustomElementDeclaration => isSynCustomElementDeclaration(declaration),
          )
          .map((declaration) => ({
            declaration,
            modulePath,
          }));
      })
      .sort((a, b) => a.declaration.tagName.localeCompare(b.declaration.tagName));

    const entries = await Promise.all(componentDeclarations.map(async (item): Promise<ComponentRawEntry> => {
      const componentName = item.declaration.tagName;
      const tagNameWithoutPrefix = getStringField(item.declaration, 'tagNameWithoutPrefix')
        ?? componentName.replace(/^syn-/, '');
      const sourceDir = join(
        componentsSourceRoot,
        tagNameWithoutPrefix,
      );

      const files = await readdir(sourceDir, { withFileTypes: true });

      const sourceFiles = files
        .filter((file) => file.isFile())
        .map((file) => relative(repoRoot, join(sourceDir, file.name)))
        .sort();

      return {
        componentName,
        dependencies: getStringArrayField(item.declaration, 'dependencies'),
        since: getStringField(item.declaration, 'since') ?? 'unknown',
        sourceFiles,
        sourceModulePath: item.modulePath,
        status: toStatus(getStringField(item.declaration, 'status')),
        summary: getStringField(item.declaration, 'summary') ?? '',
      };
    }));

    ctx.logger?.info(`ComponentsCollector: collected ${entries.length} components`);
    return ok({ entries });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect components metadata from source manifest', 'components', {
        cause: error instanceof Error ? error.message : String(error),
        manifestPath,
      }),
      ok: false,
    };
  }
};
