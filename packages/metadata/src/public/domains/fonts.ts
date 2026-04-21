import { createMetadataStore } from '../store.js';
import {
  type FontCustom,
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
} from '../types.js';
import {
  layerExistsForEntity,
  mapEntityForResponse,
  matchesEntityNameOrId,
  paginate,
  sortByEntityId,
} from '../utils.js';

/** Query options for listing or resolving font metadata entities. */
export type FontQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

const matchesNameOrId = (entity: MetadataEntity, nameOrId: string) => matchesEntityNameOrId(entity, nameOrId, {
  prefix: 'utility',
});

/**
 * List fonts with optional filtering and pagination.
 * @param options Options for querying fonts, including filtering by status and tags, pagination, and layer/verbosity preferences.
 * @param storeOptions Options for configuring the metadata store.
 * @returns A promise that resolves to a public response containing the list of fonts and metadata.
 */
export const listFonts = async (
  options: FontQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<FontCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'utility',
    package: 'fonts',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<FontCustom>[];

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
        message: `Requested layer "${requestedLayer}" is not available for all font entities.`,
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
 * Get metadata for a specific font by name or ID, with options for layer inclusion and verbosity.
 * @param nameOrId The name or ID of the font to retrieve metadata for.
 * @param options Options for querying the font, including filtering by status and tags, layer/verbosity preferences.
 * @param storeOptions Options for configuring the metadata store.
 * @returns A promise that resolves to a public response containing the font metadata, or null if not found.
 */
export const getFontMetadata = async (
  nameOrId: string,
  options: FontQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<FontCustom> | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'utility',
    package: 'fonts',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<FontCustom>[];

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
        message: `Font "${nameOrId}" was not found.`,
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
        message: `Requested layer "${requestedLayer}" is not available for font "${entity.id}".`,
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
