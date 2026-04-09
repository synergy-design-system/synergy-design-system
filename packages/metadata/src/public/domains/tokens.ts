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
  sortByEntityId,
} from '../utils.js';

export type TokenQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

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
