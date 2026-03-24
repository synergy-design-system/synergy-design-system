/**
 * Public API types for querying metadata artifacts.
 * These types intentionally avoid coupling to internal collector/pipeline modules.
 */

export type LayerName = 'full' | 'interface' | 'examples';
export type Verbosity = 'readable' | 'compact' | 'minified';

export type PublicRequestOptions = {
  includeLayerRefs?: boolean;
  includeSources?: boolean;
  layer?: LayerName;
  limit?: number;
  offset?: number;
  strictLayer?: boolean;
  verbosity?: Verbosity;
};

export type PublicErrorCode =
  | 'DATA_NOT_READY'
  | 'INTERNAL_ERROR'
  | 'INVALID_LAYER'
  | 'INVALID_QUERY'
  | 'INVALID_VERBOSITY'
  | 'LAYER_NOT_AVAILABLE'
  | 'NOT_FOUND';

export type PublicError = {
  code: PublicErrorCode;
  details?: Record<string, unknown>;
  message: string;
};

export type PublicResponseMeta = {
  builtAt: string;
  requestedLayer: LayerName;
  requestedVerbosity: Verbosity;
  resolvedLayer: LayerName;
  schemaVersion: string;
  total: number;
  warnings?: string[];
};

export type PublicResponse<T> = {
  data: T;
  errors?: PublicError[];
  meta: PublicResponseMeta;
};

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

export type IconSearchQuery = {
  /** Scope to a specific asset entity, e.g. `'asset:sick2018-icons'` or `'sick2025-icons-fill'`. Searches all icon sets when omitted. */
  assetId?: string;
  /** Case-insensitive partial match on icon name. */
  name?: string;
  /** Case-insensitive partial match on any of the icon's categories. */
  category?: string;
  /** Icon must match at least one of the supplied tags (case-insensitive partial match). */
  tags?: string[];
};

export type IconSearchResult = {
  assetId: string;
  iconName: string;
  categories: string[];
  tags: string[];
  theme?: string;
  variant?: string;
};

export interface MetadataStore {
  findEntities: (query?: MetadataQuery) => Promise<MetadataEntity[]>;
  getDataForLayer: (packageName: string, layer: LayerName) => Promise<Array<{ entityId: string; files: MetadataLayerRef[] }>>;
  getEntity: (id: string) => Promise<MetadataEntity | null>;
  getIndex: () => Promise<MetadataIndex>;
  getLayerFiles: (entityId: string, layer: LayerName) => Promise<MetadataLayerRef[]>;
  getPackageEntities: (packageName: string) => Promise<MetadataEntity[]>;
}
