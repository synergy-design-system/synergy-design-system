import { createMetadataStore } from '../store.js';
import {
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
} from '../types.js';

export type StyleQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

const sortByEntityId = (entities: MetadataEntity[]): MetadataEntity[] => [...entities].sort((a, b) => a.id.localeCompare(b.id));

const paginate = <T>(items: T[], limit?: number, offset?: number): T[] => {
  const safeOffset = Math.max(0, offset ?? 0);
  const safeLimit = limit !== undefined ? Math.max(0, limit) : undefined;

  const sliced = items.slice(safeOffset);
  if (safeLimit === undefined) {
    return sliced;
  }

  return sliced.slice(0, safeLimit);
};

const layerExistsForEntity = (entity: MetadataEntity, layer: LayerName): boolean => !!entity.layers?.[layer] && entity.layers[layer].length > 0;

const mapEntityForResponse = (
  entity: MetadataEntity,
  options: StyleQueryOptions,
): MetadataEntity => {
  const includeSources = options.includeSources ?? false;
  const includeLayerRefs = options.includeLayerRefs ?? true;

  return {
    ...entity,
    layers: includeLayerRefs ? entity.layers : undefined,
    sources: includeSources ? entity.sources : [],
  };
};

const matchesNameOrId = (entity: MetadataEntity, nameOrId: string): boolean => {
  const input = nameOrId.trim().toLowerCase();
  const entityId = entity.id.toLowerCase();
  const shortId = entityId.startsWith('style:') ? entityId.slice('style:'.length) : entityId;
  const entityName = entity.name.toLowerCase();
  const moduleName = typeof entity.custom?.moduleName === 'string' ? entity.custom.moduleName.toLowerCase() : undefined;

  if (input === entityId || input === shortId || input === entityName || input === moduleName) {
    return true;
  }

  if (!input.includes(':') && `style:${input}` === entityId) {
    return true;
  }

  if (!input.startsWith('syn-') && `style:syn-${input}` === entityId) {
    return true;
  }

  return false;
};

export const listStyles = async (
  options: StyleQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity[]>> => {
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
): Promise<PublicResponse<MetadataEntity | null>> => {
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
