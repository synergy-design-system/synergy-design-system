/**
 * Normalizer: Transform raw assets setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type AssetsRaw } from './collect.js';

export const normalize = (raw: AssetsRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const entity: CoreEntity = {
      custom: {
        exports: raw.exportKeys,
        packageName: raw.packageName,
        packageVersion: raw.packageVersion,
      },
      id: 'setup:assets-package',
      kind: 'setup',
      layers: {},
      name: 'Assets Package',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: raw.sources,
      status: 'stable',
      tags: ['assets', 'setup'],
    };

    return ok([entity]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize assets metadata', 'assets', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
