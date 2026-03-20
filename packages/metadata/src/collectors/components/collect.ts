/**
 * Placeholder collector for components.
 *
 * In the future, this will:
 * - Read from packages/components source
 * - Extract JSDoc comments and metadata
 * - Map to CoreEntity records
 */

import { type Result, err, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';

/**
 * Raw component data from source files.
 * (placeholder structure)
 */
export interface ComponentRaw {
  entries: Array<{
    tagName: string;
    since?: string;
  }>;
}

/**
 * Collector function: gather component metadata from source.
 * (Currently a stub that returns empty)
 */
export const collect = async (
  _config: { packagePath: string },
  ctx: Context,
): Promise<Result<ComponentRaw, CollectError>> => {
  ctx.logger?.info('ComponentsCollector: collect() - placeholder implementation');

  // TODO: Implement actual collection logic
  return ok({ entries: [] });
};
