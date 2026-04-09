import { createMetadataStore } from '../store.js';
import {
  type ComponentCustom,
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
} from '../types.js';
import {
  layerExistsForEntity,
  mapEntityForResponse,
  paginate,
  sortByEntityId,
} from '../utils.js';

export type ComponentQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

const getEntityTagName = (entity: MetadataEntity): string | undefined => {
  const {custom} = entity;
  const snapshot = custom?.interfaceSnapshot as Record<string, unknown> | undefined;
  const tagName = snapshot?.tagName;
  return typeof tagName === 'string' ? tagName : undefined;
};

const matchesNameOrId = (entity: MetadataEntity, nameOrId: string): boolean => {
  const input = nameOrId.trim().toLowerCase();
  const entityId = entity.id.toLowerCase();
  const shortId = entityId.startsWith('component:') ? entityId.slice('component:'.length) : entityId;
  const entityName = entity.name.toLowerCase();
  const tagName = getEntityTagName(entity)?.toLowerCase();

  if (input === entityId || input === shortId || input === entityName) {
    return true;
  }

  if (tagName && input === tagName) {
    return true;
  }

  if (!input.includes(':') && `component:${input}` === entityId) {
    return true;
  }

  if (!input.startsWith('syn-') && `component:syn-${input}` === entityId) {
    return true;
  }

  return false;
};

export const listComponents = async (
  options: ComponentQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<ComponentCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'interface';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'component',
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
        message: `Requested layer "${requestedLayer}" is not available for all component entities.`,
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

export const getComponentMetadata = async (
  nameOrId: string,
  options: ComponentQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<ComponentCustom> | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'interface';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'component',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<ComponentCustom>[];

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
        message: `Component "${nameOrId}" was not found.`,
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
        message: `Requested layer "${requestedLayer}" is not available for component "${entity.id}".`,
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
