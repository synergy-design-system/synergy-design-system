/**
 * Normalizer: Transform raw tokens setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type TokensRaw } from './collect.js';

export const normalize = (raw: TokensRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const entity: CoreEntity = {
      custom: {
        exports: raw.exportKeys,
        packageName: raw.packageName,
        packageVersion: raw.packageVersion,
      },
      id: 'setup:tokens-package',
      kind: 'setup',
      layers: {},
      name: 'Tokens Package',
      package: 'tokens',
      relations: [],
      since: raw.packageVersion,
      sources: raw.sources,
      status: 'stable',
      tags: ['setup', 'tokens'],
    };

    return ok([entity]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize tokens metadata', 'tokens', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
