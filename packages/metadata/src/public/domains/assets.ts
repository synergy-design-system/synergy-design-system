import { createMetadataStore } from '../store.js';
import {
  type IconSearchQuery,
  type IconSearchResult,
  type LayerName,
  type MetadataEntity,
  type MetadataStoreOptions,
  type PublicRequestOptions,
  type PublicResponse,
} from '../types.js';

export type AssetQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

export type IconSearchOptions = {
  limit?: number;
  offset?: number;
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
  options: AssetQueryOptions,
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
  const shortId = entityId.startsWith('asset:') ? entityId.slice('asset:'.length) : entityId;
  const entityName = entity.name.toLowerCase();

  if (input === entityId || input === shortId || input === entityName) {
    return true;
  }

  if (!input.includes(':') && `asset:${input}` === entityId) {
    return true;
  }

  return false;
};

const extractIconsFromEntity = (entity: MetadataEntity): IconSearchResult[] => {
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
  if (query.name) {
    const needle = query.name.trim().toLowerCase();
    if (!icon.iconName.toLowerCase().includes(needle)) {
      return false;
    }
  }

  if (query.category) {
    const needle = query.category.trim().toLowerCase();
    if (!icon.categories.some((c) => c.toLowerCase().includes(needle))) {
      return false;
    }
  }

  if (query.tags && query.tags.length > 0) {
    const needles = query.tags.map((t) => t.trim().toLowerCase());
    const iconTagsLower = icon.tags.map((t) => t.toLowerCase());
    if (!needles.some((needle) => iconTagsLower.some((t) => t.includes(needle)))) {
      return false;
    }
  }

  return true;
};

export const listAssets = async (
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'asset',
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

export const getAssetMetadata = async (
  nameOrId: string,
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'asset',
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

export const searchIcons = async (
  query: IconSearchQuery,
  options: IconSearchOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<IconSearchResult[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  // Load icon set entities (entities with custom.icons dict)
  let iconSetEntities: MetadataEntity[];

  if (query.assetId) {
    const entity = await store.getEntity(query.assetId.startsWith('asset:') ? query.assetId : `asset:${query.assetId}`);
    iconSetEntities = entity ? [entity] : [];
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
