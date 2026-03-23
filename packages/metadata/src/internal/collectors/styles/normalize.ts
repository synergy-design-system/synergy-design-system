/**
 * Normalizer: Transform raw styles setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type StylesRaw } from './collect.js';

export const normalize = (raw: StylesRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const entity: CoreEntity = {
      custom: {
        exports: raw.exportKeys,
        packageName: raw.packageName,
        packageVersion: raw.packageVersion,
      },
      id: 'setup:styles-package',
      kind: 'setup',
      layers: {},
      name: 'Styles Package',
      package: 'styles',
      relations: [],
      since: raw.packageVersion,
      sources: raw.sources,
      status: 'stable',
      tags: ['setup', 'styles'],
    };

    return ok([entity]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize styles metadata', 'styles', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
