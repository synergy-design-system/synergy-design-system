/**
 * Pipeline validation: validate entities and manifests.
 */
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import {
  type CoreEntity,
  type Manifest,
  validateCoreEntity,
  validateManifest,
} from '../schemas/index.js';
import { type ValidateError } from '../core/errors.js';

/**
 * Validate all core entities.
 */
export function validateEntities(
  entities: CoreEntity[],
  ctx: Context,
): Result<CoreEntity[], ValidateError> {
  const errors: ValidateError[] = [];

  for (const entity of entities) {
    const result = validateCoreEntity(entity);
    if (!result.ok) {
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    ctx.logger?.error(`Validation failed for ${errors.length} entities`);
    return err({
      details: { errors },
      kind: 'validate',
      message: `${errors.length} entities failed validation`,
    });
  }

  return ok(entities);
}

/**
 * Validate manifest.
 */
export function validateManifestData(
  manifest: Manifest,
  ctx: Context,
): Result<Manifest, ValidateError> {
  const result = validateManifest(manifest);
  if (!result.ok) {
    ctx.logger?.error('Manifest validation failed');
  }
  return result;
}
