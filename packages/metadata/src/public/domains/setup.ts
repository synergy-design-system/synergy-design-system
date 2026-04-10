import { createMetadataStore } from '../store.js';
import {
  type LayerName,
  type MetadataStoreOptions,
  type PublicResponse,
  type SetupCustom,
  type SetupEntity,
} from '../types.js';
import {
  layerExistsForEntity,
  readLayerFilesForEntity,
  sortByEntityId,
} from '../utils.js';

export type SetupPackage =
  | 'angular'
  | 'assets'
  | 'components'
  | 'fonts'
  | 'migrations'
  | 'react'
  | 'styles'
  | 'tokens'
  | 'vue';

export type SetupDataQueryOptions = {
  includeLimitations?: boolean;
  layer?: 'full';
  package: SetupPackage;
  strictLayer?: boolean;
};

export type SetupTextLayerContent = {
  content: string;
  path: string;
};

export type SetupEntry = {
  custom?: SetupCustom;
  id: string;
  name: string;
  package: string;
  sources: string[];
  tags: string[];
  text: SetupTextLayerContent[];
};

export type SetupDataPayload = {
  layer: LayerName;
  package: SetupPackage;
  setups: SetupEntry[];
  warnings?: string[];
};

const ANGULAR_ENTITY_IDS = new Set([
  'setup:angular-package',
  'setup:angular-components-module',
  'setup:angular-forms-module',
  'setup:angular-validators-module',
]);

const shouldExcludeSetupPath = (path: string, includeLimitations: boolean): boolean => {
  const normalized = path.toLowerCase();

  // Only include markdown files
  if (!normalized.endsWith('.md')) {
    return true;
  }

  if (normalized.endsWith('/changelog.md') || normalized.endsWith('/breaking_changes.md')) {
    return true;
  }

  if (!includeLimitations && normalized.endsWith('/limitations.md')) {
    return true;
  }

  return false;
};

const selectSetupEntities = (
  entities: SetupEntity[],
  options: SetupDataQueryOptions,
): SetupEntity[] => {
  if (options.package === 'components') {
    return entities.filter((entity) => entity.id === 'setup:components-package');
  }

  // Framework packages always include base components
  if (options.package === 'react') {
    const selectedIds = new Set<string>(['setup:components-package', 'setup:react-package']);
    return entities.filter((entity) => selectedIds.has(entity.id));
  }

  if (options.package === 'vue') {
    const selectedIds = new Set<string>(['setup:components-package', 'setup:vue-package']);
    return entities.filter((entity) => selectedIds.has(entity.id));
  }

  if (options.package === 'angular') {
    const selectedIds = new Set<string>(['setup:components-package', ...ANGULAR_ENTITY_IDS]);
    return entities.filter((entity) => selectedIds.has(entity.id));
  }

  if (options.package === 'migrations') {
    return entities.filter((entity) => entity.id === 'setup:synergy-migrations');
  }

  return entities.filter((entity) => entity.package === options.package);
};

export const getDataForSetup = async (
  options: SetupDataQueryOptions,
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<SetupDataPayload | null>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'full';
  const includeLimitations = options.includeLimitations ?? true;
  const requestedVerbosity = 'readable';

  const entities = sortByEntityId((await store.findEntities({
    kind: 'setup',
  })) as SetupEntity[]);

  const selected = selectSetupEntities(entities, options);

  if (selected.length === 0) {
    return {
      data: null,
      errors: [{
        code: 'NOT_FOUND',
        details: {
          package: options.package,
        },
        message: `No setup data found for package "${options.package}".`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: selected.length,
      },
    };
  }

  const hasRequestedLayer = selected.every((entity) => layerExistsForEntity(entity, requestedLayer));

  if (options.strictLayer && !hasRequestedLayer) {
    return {
      data: null,
      errors: [{
        code: 'LAYER_NOT_AVAILABLE',
        details: {
          requestedLayer,
        },
        message: `Requested layer "${requestedLayer}" is not available for all selected setup entities.`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: selected.length,
        warnings: ['strictLayer=true and requested layer is unavailable for part of result set'],
      },
    };
  }

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'full';

  const setups = await Promise.all(
    selected.map(async (entity): Promise<SetupEntry> => {
      const layerFiles = await readLayerFilesForEntity(store, entity, resolvedLayer);

      const text = layerFiles
        .filter(({ ref }) => !shouldExcludeSetupPath(ref.path, includeLimitations))
        .map(({ content, ref }) => ({
          content,
          path: ref.path,
        }))
        .toSorted((a, b) => a.path.localeCompare(b.path));

      return {
        custom: entity.custom,
        id: entity.id,
        name: entity.name,
        package: entity.package,
        sources: entity.sources.filter((source) => !shouldExcludeSetupPath(source, includeLimitations)),
        tags: entity.tags,
        text,
      };
    }),
  );

  return {
    data: {
      layer: resolvedLayer,
      package: options.package,
      setups,
      warnings: hasRequestedLayer ? undefined : [
        `Requested layer "${requestedLayer}" was unavailable; falling back to "full".`,
      ],
    },
    meta: {
      builtAt: index.builtAt,
      requestedLayer,
      requestedVerbosity,
      resolvedLayer,
      schemaVersion: index.version,
      total: selected.length,
      warnings: hasRequestedLayer ? undefined : [
        `Requested layer "${requestedLayer}" was unavailable; falling back to "full".`,
      ],
    },
  };
};
