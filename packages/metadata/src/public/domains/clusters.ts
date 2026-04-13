import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMetadataStore } from '../store.js';
import {
  type ComponentCluster,
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

export type ClusterQueryOptions = {
  limit?: number;
  offset?: number;
  status?: string;
  tags?: string[];
};

export type ClusterComponentQueryOptions = PublicRequestOptions & {
  status?: string;
  tags?: string[];
};

const normalize = (value: string): string => value.trim().toLowerCase();

const defaultDataDir = fileURLToPath(new URL('../../../data', import.meta.url));

type ClusterMeta = {
  description?: string;
  name?: string;
};

const toClusterName = (clusterId: string): string => {
  const [, rawName = clusterId] = clusterId.split('/');
  return rawName
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

const loadClusterMeta = async (options: MetadataStoreOptions): Promise<Map<string, ClusterMeta>> => {
  const dataDir = options.dataDir ?? defaultDataDir;
  const clusteringDir = resolve(dataDir, '..', 'config', 'clustering');
  const meta = new Map<string, ClusterMeta>();

  try {
    const categories = await readdir(clusteringDir, { withFileTypes: true });
    for (const category of categories) {
      if (!category.isDirectory()) {
        continue;
      }

      const categoryDir = join(clusteringDir, category.name);
      const files = await readdir(categoryDir);

      for (const fileName of files) {
        if (!fileName.endsWith('.json')) {
          continue;
        }

        const filePath = join(categoryDir, fileName);
        const clusterId = `${category.name}/${fileName.replace('.json', '')}`;
        const parsed = JSON.parse(await readFile(filePath, 'utf8')) as {
          description?: unknown;
          name?: unknown;
        };

        meta.set(clusterId, {
          description: typeof parsed.description === 'string' ? parsed.description : undefined,
          name: typeof parsed.name === 'string' ? parsed.name : undefined,
        });
      }
    }
  } catch {
    // Config files are optional at runtime (for example in published package consumers).
  }

  return meta;
};

const getClusterIds = (entity: MetadataEntity<ComponentCustom>): string[] => {
  const clusters = entity.custom?.clusters;
  if (!Array.isArray(clusters)) {
    return [];
  }

  return clusters.filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
};

const buildClusters = (
  entities: MetadataEntity<ComponentCustom>[],
  clusterMeta: Map<string, ClusterMeta> = new Map(),
): ComponentCluster[] => {
  const clusterMap = new Map<string, Set<string>>();

  for (const entity of entities) {
    const clusterIds = getClusterIds(entity);
    for (const clusterId of clusterIds) {
      if (!clusterMap.has(clusterId)) {
        clusterMap.set(clusterId, new Set());
      }
      clusterMap.get(clusterId)?.add(entity.id);
    }
  }

  return Array
    .from(clusterMap.entries())
    .map(([id, componentIdSet]) => {
      const [category] = id.split('/');
      const componentIds = Array.from(componentIdSet).toSorted((a, b) => a.localeCompare(b));
      const meta = clusterMeta.get(id);

      return {
        category,
        componentCount: componentIds.length,
        componentIds,
        description: meta?.description,
        id,
        name: meta?.name ?? toClusterName(id),
      };
    })
    .toSorted((a, b) => a.id.localeCompare(b.id));
};

const componentMatchesCluster = (entity: MetadataEntity<ComponentCustom>, clusterId: string): boolean => {
  const normalizedQuery = normalize(clusterId);
  return getClusterIds(entity).some((id) => normalize(id) === normalizedQuery);
};

/**
 * List discovered component clusters based on component metadata enrichment (`custom.clusters`).
 */
export const listComponentClusters = async (
  options: ClusterQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<ComponentCluster[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const entities = (await store.findEntities({
    kind: 'component',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<ComponentCustom>[];

  const clusterMeta = await loadClusterMeta(storeOptions);
  const clusters = buildClusters(entities, clusterMeta);
  const paged = paginate(clusters, options.limit, options.offset);

  return {
    data: paged,
    meta: {
      builtAt: index.builtAt,
      requestedLayer: 'full',
      requestedVerbosity: 'readable',
      resolvedLayer: 'full',
      schemaVersion: index.version,
      total: clusters.length,
    },
  };
};

/**
 * List component entities that belong to one cluster id (case-insensitive).
 */
export const listComponentsByCluster = async (
  clusterId: string,
  options: ClusterComponentQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<ComponentCustom>[]>> => {
  const store = createMetadataStore(storeOptions);
  const index = await store.getIndex();

  const requestedLayer = options.layer ?? 'interface';
  const requestedVerbosity = options.verbosity ?? 'readable';

  const entities = (await store.findEntities({
    kind: 'component',
    status: options.status,
    tags: options.tags,
  })) as MetadataEntity<ComponentCustom>[];

  const filtered = sortByEntityId(entities)
    .filter((entity) => componentMatchesCluster(entity, clusterId));

  const clusterMeta = await loadClusterMeta(storeOptions);
  const allClusters = buildClusters(entities, clusterMeta);
  const clusterExists = allClusters.some((cluster) => normalize(cluster.id) === normalize(clusterId));

  if (!clusterExists) {
    return {
      data: [],
      errors: [{
        code: 'NOT_FOUND',
        details: {
          clusterId,
        },
        message: `Cluster "${clusterId}" was not found.`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: 0,
      },
    };
  }

  const hasRequestedLayer = filtered.every((entity) => layerExistsForEntity(entity, requestedLayer));
  if (options.strictLayer && !hasRequestedLayer) {
    return {
      data: [],
      errors: [{
        code: 'LAYER_NOT_AVAILABLE',
        details: {
          clusterId,
          requestedLayer,
        },
        message: `Requested layer "${requestedLayer}" is not available for all components in cluster "${clusterId}".`,
      }],
      meta: {
        builtAt: index.builtAt,
        requestedLayer,
        requestedVerbosity,
        resolvedLayer: requestedLayer,
        schemaVersion: index.version,
        total: filtered.length,
        warnings: ['strictLayer=true and requested layer is unavailable for part of result set'],
      },
    };
  }

  const resolvedLayer: LayerName = hasRequestedLayer ? requestedLayer : 'full';
  const paged = paginate(filtered, options.limit, options.offset);

  return {
    data: paged.map((entity) => mapEntityForResponse(entity, options)),
    meta: {
      builtAt: index.builtAt,
      requestedLayer,
      requestedVerbosity,
      resolvedLayer,
      schemaVersion: index.version,
      total: filtered.length,
      warnings: hasRequestedLayer ? undefined : [
        `Requested layer "${requestedLayer}" was unavailable; falling back to "full".`,
      ],
    },
  };
};
