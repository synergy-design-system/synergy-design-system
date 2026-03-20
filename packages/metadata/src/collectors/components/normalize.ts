/**
 * Normalizer: Transform raw component data to canonical CoreEntity records.
 */
import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type ComponentRaw } from './collect.js';

const toDisplayName = (tagName: string): string => tagName
  .replace(/^syn-/, '')
  .split('-')
  .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
  .join(' ');

/**
 * Normalize raw component data to canonical CoreEntity format.
 */
export const normalize = (
  raw: ComponentRaw,
): Result<CoreEntity[], NormalizeError> => {
  try {
    const entities: CoreEntity[] = raw.entries.map((entry) => ({
      custom: {
        sourceModulePath: entry.sourceModulePath,
        summary: entry.summary,
      },
      id: `component:${entry.componentName}`,
      kind: 'component',
      layers: {},
      name: toDisplayName(entry.componentName),
      package: 'components',
      relations: entry.dependencies.map((dependency) => ({
        id: `component:${dependency}`,
        type: 'dependsOn' as const,
      })),
      since: entry.since,
      sources: entry.sourceFiles,
      status: entry.status,
      tags: [entry.componentName, 'component'],
    }));

    return ok(entities);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize component metadata', 'components', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
