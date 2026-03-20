/**
 * Normalizer: Transform raw component data to canonical CoreEntity records.
 * (Currently a stub)
 */
import { type Result, err, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type ComponentRaw } from './collect.js';

/**
 * Normalize raw component data to canonical CoreEntity format.
 * (Currently a stub that returns empty)
 */
export const normalize = (
  _raw: ComponentRaw,
): Result<CoreEntity[], NormalizeError> => /* TODO: Transform raw component structure to CoreEntity[] */ ok([]);
