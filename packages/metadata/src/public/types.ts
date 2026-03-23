/**
 * Public API types for querying metadata artifacts.
 * These types intentionally avoid coupling to internal collector/pipeline modules.
 */

export type LayerName = 'full' | 'interface' | 'examples';

export type MetadataRelationRef = {
  id: string;
  kind: string;
};

export type MetadataLayerRef = {
  layer: string;
  path: string;
};

export type MetadataEntity = {
  custom?: Record<string, unknown>;
  id: string;
  kind: string;
  layers?: Record<string, MetadataLayerRef[]>;
  name: string;
  package: string;
  relations: MetadataRelationRef[];
  since: string;
  sources: string[];
  status: string;
  tags: string[];
};

export type MetadataIndexEntry = {
  corePath: string;
  id: string;
  kind: string;
  layers?: Record<string, number>;
  name: string;
  search: string[];
};

export type MetadataIndex = {
  entities: MetadataIndexEntry[];
  builtAt: string;
  version: string;
};

export type MetadataQuery = {
  id?: string;
  kind?: string;
  layer?: LayerName;
  package?: string;
  status?: string;
  tags?: string[];
};

export type MetadataStoreOptions = {
  dataDir?: string;
};

export interface MetadataStore {
  findEntities: (query?: MetadataQuery) => Promise<MetadataEntity[]>;
  getDataForLayer: (packageName: string, layer: LayerName) => Promise<Array<{ entityId: string; files: MetadataLayerRef[] }>>;
  getEntity: (id: string) => Promise<MetadataEntity | null>;
  getIndex: () => Promise<MetadataIndex>;
  getLayerFiles: (entityId: string, layer: LayerName) => Promise<MetadataLayerRef[]>;
  getPackageEntities: (packageName: string) => Promise<MetadataEntity[]>;
}
