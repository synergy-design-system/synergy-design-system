/**
 * Normalizer: Transform raw styles setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type StylesRaw } from './collect.js';

const toDisplayName = (moduleName: string): string => moduleName
  .split('-')
  .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
  .join(' ');

export const normalize = (raw: StylesRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const setupEntity: CoreEntity = {
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
      sources: raw.setupSources,
      status: 'stable',
      tags: ['setup', 'styles'],
    };

    const styleEntities: CoreEntity[] = raw.moduleEntries.map((moduleEntry) => ({
      custom: {
        moduleName: moduleEntry.moduleName,
      },
      id: `style:styles-${moduleEntry.moduleName}`,
      kind: 'style',
      layers: {},
      name: `${toDisplayName(moduleEntry.moduleName)} Styles`,
      package: 'styles',
      relations: [],
      since: raw.packageVersion,
      sources: moduleEntry.sourceFiles,
      status: 'stable',
      tags: ['module', 'style', 'styles', moduleEntry.moduleName],
    }));

    return ok([setupEntity, ...styleEntities]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize styles metadata', 'styles', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
