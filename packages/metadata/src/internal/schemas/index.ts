/**
 * Validation helpers and schema exports.
 */
import { z } from 'zod';
import { CoreEntitySchema } from './core-entity.js';
import { SnapshotLockSchema } from './snapshot.js';
import { ManifestSchema } from './manifest.js';
import { type Result, err, ok } from '../core/result.js';
import { type ValidateError } from '../core/errors.js';

export * from './layer-ref.js';
export * from './core-entity.js';
export * from './snapshot.js';
export * from './manifest.js';

/**
 * Create a validate error.
 */
const createValidateError = (
  message: string,
  details?: Record<string, unknown>,
): ValidateError => ({
  details,
  kind: 'validate',
  message,
});

/**
 * Validate a core entity against schema.
 */
export const validateCoreEntity = (
  data: unknown,
): Result<z.infer<typeof CoreEntitySchema>, ValidateError> => {
  const result = CoreEntitySchema.safeParse(data);
  return result.success
    ? ok(result.data)
    : err(
      createValidateError(
        'CoreEntity validation failed',
        { issues: result.error.issues },
      ),
    );
};

/**
 * Validate a snapshot lock against schema.
 */
export const validateSnapshot = (
  data: unknown,
): Result<z.infer<typeof SnapshotLockSchema>, ValidateError> => {
  const result = SnapshotLockSchema.safeParse(data);
  return result.success
    ? ok(result.data)
    : err(
      createValidateError(
        'SnapshotLock validation failed',
        { issues: result.error.issues },
      ),
    );
};

/**
 * Validate a manifest against schema.
 */
export const validateManifest = (
  data: unknown,
): Result<z.infer<typeof ManifestSchema>, ValidateError> => {
  const result = ManifestSchema.safeParse(data);
  return result.success
    ? ok(result.data)
    : err(
      createValidateError(
        'Manifest validation failed',
        { issues: result.error.issues },
      ),
    );
};

// Re-export inferred types for use throughout pipeline
export type { CoreEntity } from './core-entity.js';
export type { LayerRef } from './layer-ref.js';
export type { SnapshotLock } from './snapshot.js';
export type { Manifest } from './manifest.js';
export type { IndexEntry } from '../pipeline/build-index.js';
