import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type LayerName,
  type MetadataEntity,
  type MetadataIndex,
  type MetadataIndexEntry,
  type MetadataLayerRef,
  type MetadataQuery,
  type MetadataStore,
  type MetadataStoreOptions,
} from './types.js';

const defaultDataDir = fileURLToPath(new URL('../../data', import.meta.url));

const readJson = async <T>(filePath: string): Promise<T> => {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
};

/**
 * Returns the version and build date from the metadata package's index.json.
 * Useful for exposing metadata version information in HTTP response headers.
 */
export const getMetadataInfo = async (): Promise<{ builtAt: string; version: string }> => {
  const index = await readJson<MetadataIndex>(join(defaultDataDir, 'index.json'));
  return { builtAt: index.builtAt, version: index.version };
};

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesQuery = (
  entity: MetadataEntity,
  query: MetadataQuery,
): boolean => {
  if (query.id && entity.id !== query.id) {
    return false;
  }

  if (query.kind && entity.kind !== query.kind) {
    return false;
  }

  if (query.package && entity.package !== query.package) {
    return false;
  }

  if (query.status && entity.status !== query.status) {
    return false;
  }

  if (query.tags && query.tags.length > 0) {
    const entityTags = entity.tags.map(normalize);
    const requested = query.tags.map(normalize);
    if (!requested.every((tag) => entityTags.includes(tag))) {
      return false;
    }
  }

  if (query.layer && (!entity.layers || !entity.layers[query.layer] || entity.layers[query.layer].length === 0)) {
    return false;
  }

  return true;
};

const buildCoreEntityPath = (dataDir: string, entry: MetadataIndexEntry): string => join(dataDir, entry.corePath.replace(/^data\//, ''));

/**
 * Create a metadata store that can query entities and read layer files.
 * @param options Optional runtime configuration (for example a custom `dataDir`).
 */
export const createMetadataStore = (options: MetadataStoreOptions = {}): MetadataStore => {
  const dataDir = options.dataDir ?? defaultDataDir;
  let indexCache: MetadataIndex | null = null;

  /**
   * Load and cache `data/index.json` for this store instance.
   */
  const getIndex = async (): Promise<MetadataIndex> => {
    if (!indexCache) {
      indexCache = await readJson<MetadataIndex>(join(dataDir, 'index.json'));
    }

    return indexCache;
  };

  /**
   * Get one entity by exact ID from the metadata index.
   */
  const getEntity = async (id: string): Promise<MetadataEntity | null> => {
    const index = await getIndex();
    const entry = index.entities.find((candidate) => candidate.id === id);
    if (!entry) {
      return null;
    }

    return readJson<MetadataEntity>(buildCoreEntityPath(dataDir, entry));
  };

  /**
   * Find entities by query fields (`kind`, `package`, `status`, `tags`, `layer`, ...).
   */
  const findEntities = async (query: MetadataQuery = {}): Promise<MetadataEntity[]> => {
    const index = await getIndex();
    const filteredEntries = index.entities.filter((entry) => {
      if (query.id && entry.id !== query.id) {
        return false;
      }

      if (query.kind && entry.kind !== query.kind) {
        return false;
      }

      return true;
    });

    const entities = await Promise.all(
      filteredEntries.map((entry) => readJson<MetadataEntity>(buildCoreEntityPath(dataDir, entry))),
    );

    return entities.filter((entity) => matchesQuery(entity, query));
  };

  /**
   * Return layer references for an entity and layer.
   * Use `readLayerFile` to resolve each reference to file contents.
   */
  const getLayerFiles = async (
    entityId: string,
    layer: LayerName,
  ): Promise<MetadataLayerRef[]> => {
    const entity = await getEntity(entityId);
    if (!entity || !entity.layers || !entity.layers[layer]) {
      return [];
    }

    return entity.layers[layer] ?? [];
  };

  const getPackageEntities = async (packageName: string): Promise<MetadataEntity[]> => findEntities({ package: packageName });

  /**
   * Return entity IDs and layer references for all entities in a package and layer.
   */
  const getDataForLayer = async (
    packageName: string,
    layer: LayerName,
  ): Promise<Array<{ entityId: string; files: MetadataLayerRef[] }>> => {
    const entities = await findEntities({ layer, package: packageName });

    return entities.map((entity) => ({
      entityId: entity.id,
      files: entity.layers?.[layer] ?? [],
    }));
  };

  /**
   * Read the UTF-8 content for a layer file reference.
   */
  const readLayerFile = async (ref: MetadataLayerRef): Promise<string> => {
    const filePath = join(dataDir, ref.path.replace(/^data\//, ''));
    return readFile(filePath, 'utf8');
  };

  return {
    findEntities,
    getDataForLayer,
    getEntity,
    getIndex,
    getLayerFiles,
    getPackageEntities,
    readLayerFile,
  };
};
