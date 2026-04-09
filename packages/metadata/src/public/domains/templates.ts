import { createMetadataStore } from '../store.js';
import {
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
  readLayerFilesForEntity,
  sortByEntityId,
} from '../utils.js';

export type TemplateQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

export type TemplateDataLayer = 'examples';

export type TemplateDataQueryOptions = {
  layer?: TemplateDataLayer;
};

export type TemplateTextLayerContent = {
  content: string;
  path: string;
};

export type TemplateDataPayload = {
  examples?: TemplateTextLayerContent[];
  layer: LayerName;
  template: string;
  warnings?: string[];
};

const matchesNameOrId = (
  entity: MetadataEntity,
  nameOrId: string,
): boolean => {
  return matchesEntityNameOrId(entity, nameOrId, {
    prefix: 'template',
  });
};

export const listTemplates = async (
  options: TemplateQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'examples';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'template',
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
        message: `Requested layer "${requestedLayer}" is not available for all template entities.`,
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

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'examples';
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
        `Requested layer "${requestedLayer}" was unavailable; falling back to "examples".`,
      ],
    },
  };
};

export const getTemplateMetadata = async (
  nameOrId: string,
  options: TemplateQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'examples';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = await store.findEntities({
    kind: 'template',
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
        message: `Template "${nameOrId}" was not found.`,
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
        message: `Requested layer "${requestedLayer}" is not available for template "${entity.id}".`,
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

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'examples';

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
        `Requested layer "${requestedLayer}" was unavailable; falling back to "examples".`,
      ],
    },
  };
};

/**
 * High-level helper for template usage payloads grouped by layer semantics.
 * - `examples`: returns markdown files from the examples layer (generated by storybook scraper)
 */
export const getDataForTemplate = async (
  nameOrId: string,
  options: TemplateDataQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<TemplateDataPayload | null>> => {
  const requestedLayer = options.layer ?? 'examples';

  const metadata = await getTemplateMetadata(nameOrId, {
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

  const basePayload: TemplateDataPayload = {
    layer: metadata.meta.resolvedLayer,
    template: metadata.data.id,
    warnings: metadata.meta.warnings,
  };

  const data = {
    ...basePayload,
    examples: textLayerContent,
  };

  return {
    ...metadata,
    data,
  };
};
