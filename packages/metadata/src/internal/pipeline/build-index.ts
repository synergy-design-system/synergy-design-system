/**
 * Build searchable index from aggregated core entities.
 */

import { type Result, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type CoreEntity } from '../schemas/index.js';

/**
 * Index entry for fast lookup and search.
 */
export interface IndexEntry {
  id: string;
  kind: string;
  name: string;
  search: string[];
  corePath: string;
  layers: Record<string, number>;
}

function toSearchToken(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }

  return undefined;
}

/**
 * Build a searchable index from core entities.
 */
export function buildIndex(
  entities: CoreEntity[],
  _ctx: Context,
): Result<IndexEntry[], never> {
  const entries: IndexEntry[] = entities.map((entity) => {
    const aliasToken = toSearchToken(entity.custom?.alias);

    return {
      corePath: `data/core/${entity.kind}/${entity.id}.json`,
      id: entity.id,
      kind: entity.kind,
      layers: Object.fromEntries(
        Object.entries(entity.layers).map(([layer, refs]) => [layer, refs.length]),
      ),
      name: entity.name,
      search: [
        entity.id,
        entity.name,
        ...entity.tags,
        ...(aliasToken ? [aliasToken] : []),
      ],
    };
  });

  return ok(entries);
}
