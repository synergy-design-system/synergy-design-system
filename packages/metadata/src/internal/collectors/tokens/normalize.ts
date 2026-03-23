/**
 * Normalizer: Transform raw tokens setup data to canonical CoreEntity records.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type TokensRaw } from './collect.js';

const toDisplayName = (sourcePath: string): string => {
  const parts = sourcePath.split('/');
  return parts[parts.length - 1] ?? sourcePath;
};

const toCanonicalTokenArtifactPath = (sourcePath: string): string => {
  if (sourcePath.startsWith('packages/tokens/dist/')) {
    return sourcePath.slice('packages/tokens/dist/'.length);
  }

  if (sourcePath.startsWith('packages/tokens/src/figma-variables/output/')) {
    return `figma-variables/${sourcePath.slice('packages/tokens/src/figma-variables/output/'.length)}`;
  }

  if (sourcePath.startsWith('packages/tokens/')) {
    return sourcePath.slice('packages/tokens/'.length);
  }

  return sourcePath;
};

const toTokenEntityId = (sourcePath: string): string => {
  const normalized = toCanonicalTokenArtifactPath(sourcePath)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return `token:tokens-${normalized}`;
};

export const normalize = (raw: TokensRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const setupEntity: CoreEntity = {
      custom: {
        artifactGroups: {
          dist: raw.distSources,
          figmaVariablesOutput: raw.figmaVariableSources,
        },
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
      sources: raw.setupSources,
      status: 'stable',
      tags: ['setup', 'tokens'],
    };

    const tokenArtifacts = [...raw.distSources, ...raw.figmaVariableSources]
      .sort()
      .map((sourcePath): CoreEntity => {
        const sourceType = sourcePath.includes('/dist/') ? 'dist' : 'figma-variables-output';

        return {
          custom: {
            artifactPath: toCanonicalTokenArtifactPath(sourcePath),
            sourceType,
          },
          id: toTokenEntityId(sourcePath),
          kind: 'token',
          layers: {},
          name: toDisplayName(sourcePath),
          package: 'tokens',
          relations: [],
          since: raw.packageVersion,
          sources: [sourcePath],
          status: 'stable',
          tags: ['artifact', 'token', 'tokens', sourceType],
        };
      });

    return ok([setupEntity, ...tokenArtifacts]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize tokens metadata', 'tokens', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
