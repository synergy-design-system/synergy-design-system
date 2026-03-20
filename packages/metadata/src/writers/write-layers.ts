/**
 * Write layer assets (markup, source code snapshots, etc.)
 * (Stub: placeholder for future layer asset mapping and copying)
 */

import { type Result, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';

/**
 * Write layer assets to data/layers/{layer}/{kind}/{id}/...
 * (Currently a stub)
 */
export async function writeLayerAssets(
  _layersDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info('Writing layer assets');

  // TODO: Copy layer assets from source locations to data/layers/
  // - examples/
  // - interface/
  // - full/

  return ok(undefined);
}
