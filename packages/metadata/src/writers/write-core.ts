/**
 * Write core entities to JSON files.
 */
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type CoreEntity, validateCoreEntity } from '../schemas/index.js';
import { type WriteError } from '../core/errors.js';

/**
 * Write core entities to data/core/{kind}/{id}.json
 * (Stub: currently just validates and returns ok)
 */
export async function writeCoreEntities(
  entities: CoreEntity[],
  _outputDir: string,
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

  // TODO: Write to filesystem
  // const coreDir = join(outputDir, 'core');
  // for (const entity of entities) {
  //   const subdir = join(coreDir, entity.kind);
  //   await mkdir(subdir, { recursive: true });
  //   const filePath = join(subdir, `${entity.id}.json`);
  //   await writeFile(filePath, JSON.stringify(entity, null, 2));
  // }

  return ok(undefined);
}
