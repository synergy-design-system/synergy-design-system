/**
 * Write manifest describing the build.
 */

import { join } from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type Manifest } from '../schemas/index.js';
import { type WriteError } from '../core/errors.js';
import { writeJsonAtomic } from './fs-utils.js';

/**
 * Write manifest to data/manifest.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeManifest(
  manifest: Manifest,
  outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info('Writing manifest');

  const normalizedManifest: Manifest = {
    ...manifest,
    sources: manifest.sources
      ? [...manifest.sources].sort((a, b) => a.source.localeCompare(b.source))
      : undefined,
  };

  try {
    await writeJsonAtomic(join(outputDir, 'manifest.json'), normalizedManifest);
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to write manifest',
      path: join(outputDir, 'manifest.json'),
    });
  }

  return ok(undefined);
}
