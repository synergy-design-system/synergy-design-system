/**
 * Write index.json for searchable metadata.
 */
import { join } from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type IndexEntry } from '../pipeline/build-index.js';
import { type WriteError } from '../core/errors.js';
import { writeJsonAtomic } from './fs-utils.js';

/**
 * Write searchable index to data/index.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeIndex(
  entries: IndexEntry[],
  outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info(`Writing index with ${entries.length} entries`);

  const sortedEntries = [...entries].sort((a, b) => a.id.localeCompare(b.id));

  const payload = {
    builtAt: new Date().toISOString(),
    entities: sortedEntries,
    version: '1.0.0',
  };

  try {
    await writeJsonAtomic(join(outputDir, 'index.json'), payload);
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to write index',
      path: join(outputDir, 'index.json'),
    });
  }

  return ok(undefined);
}
