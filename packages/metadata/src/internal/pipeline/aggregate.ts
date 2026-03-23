/**
 * Aggregation: merge core entities from multiple source pipelines.
 */

import { type Result, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type CoreEntity } from '../schemas/index.js';
import { type AggregateError } from '../core/errors.js';

/**
 * Merge multiple core entity arrays, deduplicating by id.
 * Later sources override earlier ones with the same id.
 */
export function aggregateEntities(
  groups: CoreEntity[][],
  _ctx: Context,
): Result<CoreEntity[], AggregateError> {
  const map = new Map<string, CoreEntity>();

  for (const group of groups) {
    for (const entity of group) {
      map.set(entity.id, entity);
    }
  }

  return ok(Array.from(map.values()));
}
