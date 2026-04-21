import { createMetadataStore } from '../store.js';
import {
  type AssetCustom,
  type IconSearchQuery,
  type IconSearchResult,
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

/** Query options for listing or resolving asset entities. */
export type AssetQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

/** Pagination controls for icon search results. */
export type IconSearchOptions = {
  limit?: number;
  offset?: number;
};

const matchesNameOrId = (entity: MetadataEntity<AssetCustom>, nameOrId: string) => matchesEntityNameOrId(entity, nameOrId, {
  prefix: 'asset',
});

const extractIconsFromEntity = (entity: MetadataEntity<AssetCustom>): IconSearchResult[] => {
  const iconsRaw = entity.custom?.icons;
  if (!iconsRaw || typeof iconsRaw !== 'object' || Array.isArray(iconsRaw)) {
    return [];
  }

  const icons = iconsRaw as Record<string, { categories?: string[]; tags?: string[] }>;
  const theme = typeof entity.custom?.theme === 'string' ? entity.custom.theme : undefined;
  const variant = typeof entity.custom?.variant === 'string' ? entity.custom.variant : undefined;

  return Object.entries(icons).map(([iconName, iconData]) => ({
    assetId: entity.id,
    categories: iconData.categories ?? [],
    iconName,
    tags: iconData.tags ?? [],
    theme,
    variant,
  }));
};

const matchesIconQuery = (icon: IconSearchResult, query: IconSearchQuery): boolean => {
  const mode = query.filterMode ?? 'or';

  // `name` always uses exact AND logic — it is an identifier filter, not a semantic search field
  if (query.name) {
    const needle = query.name.trim().toLowerCase();
    if (!icon.iconName.toLowerCase().includes(needle)) {
      return false;
    }
  }

  const categories = query.category
    ? (Array.isArray(query.category) ? query.category : [query.category]).map((c) => c.trim().toLowerCase())
    : [];
  const tags = query.tags && query.tags.length > 0
    ? query.tags.map((t) => t.trim().toLowerCase())
    : [];

  if (categories.length === 0 && tags.length === 0) {
    return true;
  }

  const iconCategoriesLower = icon.categories.map((c) => c.toLowerCase());
  const iconTagsLower = icon.tags.map((t) => t.toLowerCase());

  const categoryMatch = categories.length > 0
    ? categories.some((needle) => iconCategoriesLower.some((c) => c.includes(needle)))
    : null;
  const tagMatch = tags.length > 0
    ? tags.some((needle) => iconTagsLower.some((t) => t.includes(needle)))
    : null;

  if (mode === 'and') {
    // All provided filter groups must match (null means the group was not provided — skip it)
    if (categoryMatch === false) return false;
    if (tagMatch === false) return false;
    return true;
  }

  // 'or': at least one provided filter group must match
  if (categoryMatch === true || tagMatch === true) return true;
  return false;
};

/**
 * List all available asset entities, optionally filtered by status and/or tags.
 * @param options The query options to filter and paginate the results.
 * @param storeOptions Options for configuring the metadata store instance used to fetch the data.
 * @returns A public response containing the list of asset entities matching the query, along with metadata about the request and any errors or warnings.
 */
export const listAssets = async (
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<AssetCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'asset',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<AssetCustom>[];

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
        message: `Requested layer "${requestedLayer}" is not available for all asset entities.`,
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
 * Get metadata for a specific asset entity by its name or ID.
 * @param nameOrId The name or ID of the asset entity to retrieve.
 * @param options The query options to filter and paginate the results.
 * @param storeOptions Options for configuring the metadata store instance used to fetch the data.
 * @returns A public response containing the asset entity metadata, along with metadata about the request and any errors or warnings.
 */
export const getAssetMetadata = async (
  nameOrId: string,
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<AssetCustom> | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'asset',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<AssetCustom>[];

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
        message: `Asset "${nameOrId}" was not found.`,
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
        message: `Requested layer "${requestedLayer}" is not available for asset "${entity.id}".`,
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
 * Search icons across asset icon sets using name/category/tag filters.
 * @param query Filter criteria for icon names, categories, tags, and optional icon-set scope.
 * @param options Pagination controls for result slicing.
 * @param storeOptions Optional metadata store configuration.
 * @returns Matching icons and standard response metadata.
 */
export const searchIcons = async (
  query: IconSearchQuery,
  options: IconSearchOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IconSearchResult[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  // Load icon set entities (entities with custom.icons dict)
  let iconSetEntities: MetadataEntity<AssetCustom>[];

  if (query.assetId) {
    const assetIdsToScan = Array.isArray(query.assetId) ? query.assetId : [query.assetId];
    // eslint-disable-next-line no-confusing-arrow
    const assetIds = assetIdsToScan.map(id => id.startsWith('asset:') ? id : `asset:${id}`);
    const results = await Promise.all(assetIds.map((id) => store.getEntity(id)));
    iconSetEntities = results.filter((e): e is MetadataEntity<AssetCustom> => e !== null);
  } else {
    iconSetEntities = await store.findEntities({ kind: 'asset' });
    // Only entities that have an icons dict (icon sets, not logos/system-icons)
    iconSetEntities = iconSetEntities.filter((e) => e.custom?.icons && typeof e.custom.icons === 'object' && !Array.isArray(e.custom.icons));
  }

  const allIcons = iconSetEntities.flatMap(extractIconsFromEntity);
  const filtered = allIcons.filter((icon) => matchesIconQuery(icon, query));
  const sorted = [...filtered].sort((a, b) => {
    const assetCmp = a.assetId.localeCompare(b.assetId);
    return assetCmp !== 0 ? assetCmp : a.iconName.localeCompare(b.iconName);
  });

  const paged = paginate(sorted, options.limit, options.offset);

  return {
    data: paged,
    meta: {
      builtAt: index.builtAt,
      requestedLayer: 'full',
      requestedVerbosity: 'readable',
      resolvedLayer: 'full',
      schemaVersion: index.version,
      total: sorted.length,
    },
  };
};
