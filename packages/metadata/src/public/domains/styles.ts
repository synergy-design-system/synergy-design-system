import { createMetadataStore } from '../store.js';
import {
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
  type StyleCustom,
} from '../types.js';
import {
  layerExistsForEntity,
  mapEntityForResponse,
  matchesEntityNameOrId,
  paginate,
  readLayerFilesForEntity,
  sortByEntityId,
} from '../utils.js';

export type StyleQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

export type StyleDataLayer = 'examples';

export type StyleDataQueryOptions = {
  layer?: StyleDataLayer;
};

export type StyleTextLayerContent = {
  content: string;
  path: string;
};

export type StyleDataPayload = {
  examples?: StyleTextLayerContent[];
  layer: LayerName;
  style: string;
  warnings?: string[];
};

const matchesNameOrId = (entity: MetadataEntity, nameOrId: string) => matchesEntityNameOrId(entity, nameOrId, {
  extraCandidates: [typeof entity.custom?.moduleName === 'string' ? entity.custom.moduleName : undefined],
  prefix: 'style',
  // eslint-disable-next-line no-confusing-arrow
  prefixedCandidates: (input) => !input.startsWith('syn-') ? [`style:syn-${input}`] : [],
});

export const listStyles = async (
  options: StyleQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<StyleCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'style',
    status: options.status,
    tags: options.tags,
  });

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
        message: `Requested layer "${requestedLayer}" is not available for all style entities.`,
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

export const getStyleMetadata = async (
  nameOrId: string,
  options: StyleQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<StyleCustom> | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'style',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<StyleCustom>[];

  const sorted = sortByEntityId(entities);
  const entity = sorted.find((candidate) => matchesNameOrId(candidate, nameOrId));

  if (!entity) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          nameOrId,
        },
        message: `Style "${nameOrId}" was not found.`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: sorted.length,
      },
    };
  }

  const hasRequestedLayer = layerExistsForEntity(entity, requestedLayer);
  if (options.strictLayer && !hasRequestedLayer) {
    return {
      data: null,
      errors: [{
        code: 'LAYER_NOT_AVAILABLE',
        details: {
          id: entity.id,
          requestedLayer,
        },
        message: `Requested layer "${requestedLayer}" is not available for style "${entity.id}".`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: sorted.length,
        warnings: ['strictLayer=true and requested layer is unavailable for the selected entity'],
      },
    };
  }

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'full';

  return {
    data: mapEntityForResponse(entity, options),
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
 * High-level helper for style usage payloads grouped by layer semantics.
 * - `examples`: returns markdown files from the examples layer
 */
export const getDataForStyle = async (
  nameOrId: string,
  options: StyleDataQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<StyleDataPayload | null>> => {
  const requestedLayer = options.layer ?? 'examples';

  const metadata = await getStyleMetadata(nameOrId, {
    includeLayerRefs: true,
    includeSources: false,
    layer: requestedLayer,
  }, storeOptions);

  if (!metadata.data) {
    return {
      ...metadata,
      data: null,
    };
  }

  const store = createMetadataStore(storeOptions);
  const layerFiles = await readLayerFilesForEntity(store, metadata.data, metadata.meta.resolvedLayer);

  const textLayerContent = layerFiles
    .filter(({ ref }) => ref.path.endsWith('.md'))
    .map(({ content, ref }) => ({
      content,
      path: ref.path,
    }))
    .toSorted((a, b) => a.path.localeCompare(b.path));

  const data: StyleDataPayload = {
    examples: textLayerContent,
    layer: metadata.meta.resolvedLayer,
    style: metadata.data.id,
    warnings: metadata.meta.warnings,
  };

  return {
    ...metadata,
    data,
  };
};
