import { createMetadataStore } from '../store.js';
import {
  type ComponentAngularCustom,
  type ComponentCustom,
  type ComponentReactJsxCustom,
  type ComponentReactWrapperCustom,
  type ComponentVueCustom,
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
  readLayerFilesForEntity,
  sortByEntityId,
} from '../utils.js';

export type ComponentQueryOptions = PublicRequestOptions & {
  includeInterfaceSnapshot?: boolean;
  status?: string;
  tags?: string[];
};

export type ComponentDataLayer = 'examples' | 'full' | 'interface';
export type ComponentFramework = 'angular' | 'react' | 'vanilla' | 'vue';

export type ComponentDataQueryOptions = {
  framework?: ComponentFramework;
  layer?: ComponentDataLayer;
};

export type ComponentFrameworkDetails =
  | ComponentAngularCustom
  | ComponentReactWrapperCustom
  | ComponentReactJsxCustom
  | ComponentVueCustom
  | {
    jsx?: ComponentReactJsxCustom;
    wrapper?: ComponentReactWrapperCustom;
  };

export type ComponentLayerContent = {
  content: string;
  layer: LayerName;
  path: string;
};

export type ComponentTextLayerContent = {
  content: string;
  path: string;
};

export type ComponentDataPayload = {
  component: string;
  framework: ComponentFramework;
  interface?: ComponentTextLayerContent[];
  layer: LayerName;
  requestedFrameworkDetails?: ComponentFrameworkDetails;
  relevantLayerCode?: ComponentLayerContent[];
  examples?: ComponentTextLayerContent[];
  warnings?: string[];
};

const isFrameworkLayerFile = (path: string, framework: ComponentFramework): boolean => {
  if (framework === 'vanilla') {
    return path.includes('/components/');
  }

  return path.includes(`/${framework}/`);
};

const isTestLayerFile = (path: string): boolean => {
  const normalized = path.toLowerCase();
  return normalized.includes('.test.') || normalized.includes('.spec.');
};

const isIncludedLayerFile = (path: string, framework: ComponentFramework): boolean => {
  if (isTestLayerFile(path)) {
    return false;
  }

  return path.includes('/components/') || isFrameworkLayerFile(path, framework);
};

const readInterfaceSnapshot = async (
  store: ReturnType<typeof createMetadataStore>,
  entity: MetadataEntity<ComponentCustom>,
): Promise<ComponentCustom['interfaceSnapshot'] | undefined> => {
  const interfaceRef = entity.layers?.interface?.find((ref) => ref.path.endsWith('.json'));
  if (!interfaceRef) {
    return undefined;
  }

  const content = await store.readLayerFile(interfaceRef);
  return JSON.parse(content) as ComponentCustom['interfaceSnapshot'];
};

const hydrateInterfaceSnapshot = async (
  store: ReturnType<typeof createMetadataStore>,
  entity: MetadataEntity<ComponentCustom>,
  options: ComponentQueryOptions,
): Promise<MetadataEntity<ComponentCustom>> => {
  if (!options.includeInterfaceSnapshot || entity.custom?.interfaceSnapshot) {
    return entity;
  }

  const interfaceSnapshot = await readInterfaceSnapshot(store, entity);
  if (!interfaceSnapshot) {
    return entity;
  }

  return {
    ...entity,
    custom: {
      ...entity.custom,
      interfaceSnapshot,
    },
  };
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
  const hydrated = await Promise.all(
    paged.map((entity) => hydrateInterfaceSnapshot(store, entity, options)),
  );

  return {
    data: hydrated.map((entity) => mapEntityForResponse(entity, options)),
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
  const hydrated = await hydrateInterfaceSnapshot(store, entity, options);

  return {
    data: mapEntityForResponse(hydrated, options),
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
 * High-level helper for component usage payloads grouped by layer semantics.
 * - `full`: returns filtered source files (vanilla + requested framework)
 * - `examples`: returns markdown files from the examples layer
 * - `interface`: returns markdown files from the interface layer
 */
export const getDataForComponent = async (
  nameOrId: string,
  options: ComponentDataQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ComponentDataPayload | null>> => {
  const requestedLayer = options.layer ?? 'full';
  const resolvedFramework = options.framework ?? 'vanilla';

  const metadata = await getComponentMetadata(nameOrId, {
    includeInterfaceSnapshot: requestedLayer === 'interface',
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

  const codeLayerContent = layerFiles
    .filter(({ ref }) => isIncludedLayerFile(ref.path, resolvedFramework))
    .map(({ content, ref }) => ({
      content,
      layer: ref.layer as LayerName,
      path: ref.path,
    }))
    .toSorted((a, b) => a.path.localeCompare(b.path));

  const frameworkDetails = resolvedFramework === 'vanilla'
    ? undefined
    : metadata.data.custom?.frameworks?.[resolvedFramework as 'angular' | 'react' | 'vue'];

  const basePayload: ComponentDataPayload = {
    component: metadata.data.id,
    framework: resolvedFramework,
    layer: metadata.meta.resolvedLayer,
    requestedFrameworkDetails: frameworkDetails,
    warnings: metadata.meta.warnings,
  };

  const data = metadata.meta.resolvedLayer === 'examples'
    ? {
      ...basePayload,
      examples: textLayerContent,
    }
    : metadata.meta.resolvedLayer === 'interface'
      ? {
        ...basePayload,
        interface: textLayerContent,
      }
      : {
        ...basePayload,
        relevantLayerCode: codeLayerContent,
      };

  return {
    ...metadata,
    data,
  };
};
