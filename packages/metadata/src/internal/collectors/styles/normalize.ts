/**
 * Normalizer: Transform raw styles setup data to canonical CoreEntity records.
 */
import { basename } from 'node:path';
import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type StylesRaw } from './collect.js';

const toStyleIdName = (styleName: string): string => (styleName.startsWith('syn-') ? styleName : `syn-${styleName}`);

const toStyleNameFromSource = (sourcePath: string, moduleName: string): string => {
  const fileName = basename(sourcePath, '.css');

  // Single-file modules keep the module name (index.css -> syn-link, syn-link-list).
  if (fileName === 'index') {
    return moduleName;
  }

  return fileName;
};

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

    const styleEntities: CoreEntity[] = raw.moduleEntries.flatMap((moduleEntry) => moduleEntry.sourceFiles.map((sourcePath) => {
      const styleName = toStyleNameFromSource(sourcePath, moduleEntry.moduleName);
      const name = toStyleIdName(styleName);

      return {
        custom: {
          moduleName: moduleEntry.moduleName,
        },
        id: `style:${name}`,
        kind: 'style',
        layers: {},
        name,
        package: 'styles',
        relations: [],
        since: raw.packageVersion,
        sources: [sourcePath],
        status: 'stable',
        tags: [
          'module',
          'style',
          'styles',
          moduleEntry.moduleName,
          styleName,
          name,
        ].sort(),
      };
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
