/**
 * Write index.json for searchable metadata.
 */
import { type Result, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type IndexEntry } from '../pipeline/build-index.js';
import { type WriteError } from '../core/errors.js';

/**
 * Write searchable index to data/index.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeIndex(
  entries: IndexEntry[],
  _outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info(`Writing index with ${entries.length} entries`);

  // TODO: Write to data/index.json
  // const indexPath = join(outputDir, 'index.json');
  // const index = {
  //   version: '1.0.0',
  //   builtAt: new Date().toISOString(),
  //   entities: entries
  // };
  // await writeFile(indexPath, JSON.stringify(index, null, 2));

  return ok(undefined);
}
