/**
 * Write core entities to JSON files.
 */
import { join } from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type CoreEntity, validateCoreEntity } from '../schemas/index.js';
import { type WriteError } from '../core/errors.js';
import { writeJsonAtomic } from './fs-utils.js';

/**
 * Write core entities to data/core/{kind}/{id}.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeCoreEntities(
  entities: CoreEntity[],
  outputDir: string,
  ctx: Context,
): Promise<Result<void, WriteError>> {
  ctx.logger?.info(`Writing ${entities.length} core entities`);

  // Validate all entities before writing
  for (const entity of entities) {
    const valid = validateCoreEntity(entity);
    if (!valid.ok) {
      return err({
        details: valid.error.details,
        kind: 'write',
        message: `Entity ${entity.id} failed validation`,
      });
    }
  }

  ctx.logger?.info('Core entities validated successfully');

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind.localeCompare(b.kind);
    }

    return a.id.localeCompare(b.id);
  });

  try {
    for (const entity of sortedEntities) {
      const filePath = join(outputDir, 'core', entity.kind, `${entity.id}.json`);
      await writeJsonAtomic(filePath, entity);
    }
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to write core entities',
      path: join(outputDir, 'core'),
    });
  }

  return ok(undefined);
}
