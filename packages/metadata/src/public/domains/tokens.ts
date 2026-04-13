import { createMetadataStore } from '../store.js';
import {
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
  type TokenCustom,
} from '../types.js';
import {
  layerExistsForEntity,
  mapEntityForResponse,
  paginate,
  readLayerFilesForEntity,
  sortByEntityId,
} from '../utils.js';

export type TokenQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

export type TokenFormat = 'css' | 'figma' | 'javascript' | 'sass';
export type TokenTheme = 'sick2018-dark' | 'sick2018-light' | 'sick2025-dark' | 'sick2025-light';

export type TokenDataQueryOptions = {
  format?: TokenFormat;
  limit?: number;
  offset?: number;
  theme?: TokenTheme;
};

export type TokenDataContent = {
  content: string;
  format?: TokenFormat;
  path: string;
  theme?: TokenTheme;
  token: string;
};

export type TokenDataPayload = {
  format: TokenFormat;
  theme?: TokenTheme;
  tokens: TokenDataContent[];
  warnings?: string[];
};

const deriveTokenFormat = (artifactPath?: string): TokenFormat | undefined => {
  if (!artifactPath) {
    return undefined;
  }

  const normalized = artifactPath.toLowerCase();

  if (normalized.includes('figma-variables/') && normalized.endsWith('.json')) {
    return 'figma';
  }

  if (normalized.endsWith('.scss')) {
    return 'sass';
  }

  if (normalized.endsWith('.js') || normalized.endsWith('.d.ts')) {
    return 'javascript';
  }

  if (normalized.endsWith('.css')) {
    return 'css';
  }

  return undefined;
};

const deriveTokenTheme = (artifactPath?: string): TokenTheme | undefined => {
  if (!artifactPath) {
    return undefined;
  }

  const normalized = artifactPath
    .toLowerCase()
    .replace(/_/g, '-');

  if (normalized.includes('sick2025') && normalized.includes('dark')) {
    return 'sick2025-dark';
  }

  if (normalized.includes('sick2025') && normalized.includes('light')) {
    return 'sick2025-light';
  }

  if (normalized.includes('sick2018') && normalized.includes('dark')) {
    return 'sick2018-dark';
  }

  if (normalized.includes('sick2018') && normalized.includes('light')) {
    return 'sick2018-light';
  }

  return undefined;
};

/**
 * List tokens with optional filtering and pagination.
 * @param options Options for querying tokens, including filtering by status and tags, pagination, and layer/verbosity preferences.
 * @param storeOptions Options for configuring the metadata store.
 * @returns A promise that resolves to a public response containing the list of tokens and metadata.
 */
export const getTokens = async (
  options: TokenQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<TokenCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'token',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<TokenCustom>[];

  const sorted = sortByEntityId(entities);
  const hasRequestedLayer = sorted.every((entity) => layerExistsForEntity(entity, requestedLayer));

  if (options.strictLayer && !hasRequestedLayer) {
    return {
      data: [],
      errors: [{
        code: 'LAYER_NOT_AVAILABLE',
        details: {
          requestedLayer,
        },
        message: `Requested layer "${requestedLayer}" is not available for all token entities.`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: sorted.length,
        warnings: ['strictLayer=true and requested layer is unavailable for part of result set'],
      },
    };
  }

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'full';
  const paged = paginate(sorted, options.limit, options.offset);

  return {
    data: paged.map((entity) => mapEntityForResponse(entity, options)),
    meta: {
      builtAt: index.builtAt,
      requestedLayer,
      requestedVerbosity,
      resolvedLayer,
      schemaVersion: index.version,
      total: sorted.length,
      warnings: hasRequestedLayer ? undefined : [
        `Requested layer "${requestedLayer}" was unavailable; falling back to "full".`,
      ],
    },
  };
};

/**
 * Get token data for a specific format and theme, with options for pagination.
 * @param options Options for querying token data, including format, theme, pagination preferences.
 * @param storeOptions Options for configuring the metadata store.
 * @returns A promise that resolves to a public response containing the token data payload, or null if not found.
 */
export const getDataForTokens = async (
  options: TokenDataQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<TokenDataPayload>> => {
  const requestedFormat = options.format ?? 'css';
  const resolvedTheme = requestedFormat === 'css'
    ? (options.theme ?? 'sick2025-light')
    : options.theme;

  const metadata = await getTokens({
    includeLayerRefs: true,
    includeSources: false,
    layer: 'full',
  }, storeOptions);

  const warnings: string[] = [];
  if (requestedFormat !== 'css' && options.theme) {
    warnings.push(`Theme "${options.theme}" is ignored for format "${requestedFormat}".`);
  }

  const filteredEntities = metadata.data.filter((entity) => {
    const format = (entity.custom?.format as TokenFormat | undefined)
      ?? deriveTokenFormat(entity.custom?.artifactPath);
    const theme = (entity.custom?.theme as TokenTheme | undefined)
      ?? deriveTokenTheme(entity.custom?.artifactPath);

    if (format !== requestedFormat) {
      return false;
    }

    if (requestedFormat === 'css') {
      return theme === resolvedTheme;
    }

    return true;
  });

  const pagedEntities = paginate(filteredEntities, options.limit, options.offset);
  const store = createMetadataStore(storeOptions);

  const tokenEntries = (await Promise.all(
    pagedEntities.map(async (entity) => {
      const files = await readLayerFilesForEntity(store, entity, 'full');
      const format = (entity.custom?.format as TokenFormat | undefined)
        ?? deriveTokenFormat(entity.custom?.artifactPath);
      const theme = (entity.custom?.theme as TokenTheme | undefined)
        ?? deriveTokenTheme(entity.custom?.artifactPath);

      return files.map(({ content, ref }) => ({
        content,
        format,
        path: ref.path,
        theme,
        token: entity.id,
      }));
    }),
  )).flat();

  return {
    data: {
      format: requestedFormat,
      theme: requestedFormat === 'css' ? resolvedTheme : undefined,
      tokens: tokenEntries,
      warnings: warnings.length > 0 ? warnings : undefined,
    },
    errors: metadata.errors,
    meta: {
      ...metadata.meta,
      total: filteredEntities.length,
      warnings: [
        ...(metadata.meta.warnings ?? []),
        ...warnings,
      ],
    },
  };
};
