/**
 * Write manifest describing the build.
 */

import { type Result, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type Manifest } from '../schemas/index.js';
import { type WriteError } from '../core/errors.js';

/**
 * Write manifest to data/manifest.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeManifest(
  manifest: Manifest,
  _outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info('Writing manifest');

  // TODO: Write to data/manifest.json
  // const manifestPath = join(outputDir, 'manifest.json');
  // await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  return ok(undefined);
}
