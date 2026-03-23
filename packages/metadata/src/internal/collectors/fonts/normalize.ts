/**
 * Normalizer: Transform raw fonts setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type FontsRaw } from './collect.js';

export const normalize = (raw: FontsRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const entity: CoreEntity = {
      custom: {
        exports: raw.exportKeys,
        packageName: raw.packageName,
        packageVersion: raw.packageVersion,
      },
      id: 'setup:fonts-package',
      kind: 'setup',
      layers: {},
      name: 'Fonts Package',
      package: 'fonts',
      relations: [],
      since: raw.packageVersion,
      sources: raw.sources,
      status: 'stable',
      tags: ['fonts', 'setup'],
    };

    return ok([entity]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize fonts metadata', 'fonts', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
