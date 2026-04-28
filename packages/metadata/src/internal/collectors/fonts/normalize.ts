/**
 * Normalizer: Transform raw fonts setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type FontsRaw } from './collect.js';

export const normalize = (raw: FontsRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const setupEntity: CoreEntity = {
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
      sources: raw.setupSources,
      status: 'stable',
      tags: ['fonts', 'setup'],
    };

    const artifactEntities: CoreEntity[] = raw.artifactSources.length > 0
      ? [{
        custom: {
          artifactPath: 'sick-intl',
          artifactType: 'font-source',
        },
        id: 'utility:fonts-sick-intl',
        kind: 'utility',
        layers: {},
        name: 'SICK Intl Font Source',
        package: 'fonts',
        relations: [],
        since: raw.packageVersion,
        sources: raw.artifactSources,
        status: 'stable',
        tags: ['font', 'fonts', 'metadata', 'utility'],
      }]
      : [];

    return ok([setupEntity, ...artifactEntities]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize fonts metadata', 'fonts', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
