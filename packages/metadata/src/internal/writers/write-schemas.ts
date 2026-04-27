import { join } from 'node:path';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';
import { type Result, err, ok } from '../core/result.js';
import { writeJsonAtomic } from './fs-utils.js';

/**
 * Write generated JSON schemas to data/schemas/*.json.
 */
export async function writeSchemas(
  schemas: Record<string, unknown>,
  outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  const entries = Object.entries(schemas).sort(([a], [b]) => a.localeCompare(b));

  try {
    for (const [fileName, schema] of entries) {
      await writeJsonAtomic(join(outputDir, 'schemas', fileName), schema);
      ctx.logger?.debug(`Wrote schema: ${fileName}`);
    }
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to write schemas',
      path: join(outputDir, 'schemas'),
    });
  }

  return ok(undefined);
}
