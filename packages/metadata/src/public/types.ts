/**
 * Public API types for querying metadata artifacts.
 * These types intentionally avoid coupling to internal collector/pipeline modules.
 */

export type LayerName = 'full' | 'interface' | 'examples';
export type Verbosity = 'readable' | 'compact' | 'minified';

// ---------------------------------------------------------------------------
// Component custom types
// ---------------------------------------------------------------------------

export type ComponentNamedDescription = {
  description: string;
  name: string;
};

export type ComponentInterfaceAttribute = {
  default?: string;
  description: string;
  fieldName?: string;
  name: string;
  reflects: boolean;
  type?: string;
};

export type ComponentInterfaceProperty = {
  access: 'public' | 'readonly';
  default?: string;
  description: string;
  name: string;
  type?: string;
};

export type ComponentInterfaceMethod = {
  description: string;
  name: string;
  parameters: Array<{ name: string; type?: string }>;
  returnType?: string;
};

export type ComponentInterfaceEvent = {
  description: string;
  name: string;
  type?: string;
};

export type ComponentInterfaceSnapshot = {
  attributes: ComponentInterfaceAttribute[];
  cssParts: ComponentNamedDescription[];
  dependencies: string[];
  documentation?: string;
  events: ComponentInterfaceEvent[];
  methods: ComponentInterfaceMethod[];
  properties: ComponentInterfaceProperty[];
  since: string;
  slots: ComponentNamedDescription[];
  sourceModulePath: string;
  status: string;
  summary: string;
  tagName: string;
};

export type ComponentAngularCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  selector: string;
  sourcePath: string;
};

export type ComponentReactWrapperCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

export type ComponentReactJsxCustom = {
  componentName: string;
  documentation?: string;
  events?: Array<{ name: string; type: string }>;
  packageName: string;
  since: string;
  sourcePath: string;
  status: string;
  subpathExport: string;
  typeName: string;
};

export type ComponentVueCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

export type ComponentCustom = {
  clusters?: string[];
  frameworks?: {
    angular?: ComponentAngularCustom;
    react?: {
      jsx?: ComponentReactJsxCustom;
      wrapper?: ComponentReactWrapperCustom;
    };
    vue?: ComponentVueCustom;
  };
  interfaceSnapshot?: ComponentInterfaceSnapshot;
  override?: {
    stories?: Array<{
      description?: { type: string; value: string };
      name: string;
      title?: { type: string; value: string };
    }>;
    storySourcePath?: string;
    storyTags?: string[];
  };
};

// ---------------------------------------------------------------------------
// Font custom types
// ---------------------------------------------------------------------------

export type FontCustom = {
  artifactPath?: string;
  artifactType?: string;
};

// ---------------------------------------------------------------------------
// Style custom types
// ---------------------------------------------------------------------------

export type StyleCustom = {
  moduleName?: string;
};

// ---------------------------------------------------------------------------
// Token custom types
// ---------------------------------------------------------------------------

export type TokenCustom = {
  artifactPath?: string;
  sourceType?: string;
};

// ---------------------------------------------------------------------------
// Migration custom types
// ---------------------------------------------------------------------------

export type MigrationCustom = {
  migrationType?: string;
  versions?: string[];
};

// ---------------------------------------------------------------------------
// Asset custom types
// ---------------------------------------------------------------------------

export type AssetIconData = {
  categories?: string[];
  tags?: string[];
};

export type AssetIconSetCustom = {
  exportName: string;
  iconCount: number;
  icons: Record<string, AssetIconData>;
  theme: string;
  variant: string;
};

export type AssetLogoCustom = {
  category: string;
  files: string[];
  theme: string;
};

export type AssetSystemIconCustom = {
  files: string[];
  theme: string;
};

/**
 * Common, ergonomic custom shape for mixed asset entity results.
 * Asset APIs can return icon sets, logos, system icons, and setup-like records.
 * Optional fields allow consumers to access shared values (e.g. theme/iconCount)
 * without narrow/cast gymnastics while still exposing richer fields when present.
 */
export type AssetCustom = {
  category?: string;
  exportName?: string;
  files?: string[];
  iconCount?: number;
  icons?: Record<string, AssetIconData>;
  theme?: string;
  variant?: string;
};

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

export type MetadataEntity<TCustom = Record<string, unknown>> = {
  custom?: TCustom;
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

// ---------------------------------------------------------------------------
// Convenience entity type aliases
// ---------------------------------------------------------------------------

export type AssetIconSetEntity = MetadataEntity<AssetIconSetCustom>;
export type AssetLogoEntity = MetadataEntity<AssetLogoCustom>;
export type AssetSystemIconEntity = MetadataEntity<AssetSystemIconCustom>;
export type AssetEntity = MetadataEntity<AssetCustom>;
export type ComponentEntity = MetadataEntity<ComponentCustom>;
export type FontEntity = MetadataEntity<FontCustom>;
export type MigrationEntity = MetadataEntity<MigrationCustom>;
export type StyleEntity = MetadataEntity<StyleCustom>;
export type TokenEntity = MetadataEntity<TokenCustom>;

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

export type IconFilterMode = 'and' | 'or';

export type IconSearchQuery = {
  /**
   * Scope to one or more asset entities by ID, e.g. `'asset:sick2018-icons'` or
   * `['sick2025-icons-fill', 'sick2025-icons-outline']`. Searches all icon sets when omitted.
   */
  assetId?: string | string[];
  /**
   * Filter by category. Accepts a single string or an array of strings.
   * Each value is a case-insensitive partial match against any of the icon's categories.
   * When multiple values are provided, `filterMode` controls whether the icon must match
   * all categories (and) or at least one (or). Defaults to `'or'`.
   */
  category?: string | string[];
  /**
   * Controls how multiple `category` values and the combination of `category` + `tags` are
   * evaluated. `'or'` (default): icon matches if any filter field matches.
   * `'and'`: icon must match all provided filter fields.
   */
  filterMode?: IconFilterMode;
  /** Case-insensitive partial match on icon name. */
  name?: string;
  /** Filter by tag. At least one tag value must match (case-insensitive partial match). */
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
  /** Find entities by query filters. */
  findEntities: (query?: MetadataQuery) => Promise<MetadataEntity[]>;
  /** List entity IDs and layer file refs for all entities in a package and layer. */
  getDataForLayer: (packageName: string, layer: LayerName) => Promise<Array<{ entityId: string; files: MetadataLayerRef[] }>>;
  /** Get one entity by exact ID. Returns `null` when not found. */
  getEntity: (id: string) => Promise<MetadataEntity | null>;
  /** Get metadata index data (`data/index.json`). */
  getIndex: () => Promise<MetadataIndex>;
  /** Return only layer file references for one entity and layer. */
  getLayerFiles: (entityId: string, layer: LayerName) => Promise<MetadataLayerRef[]>;
  /** Get all entities belonging to a package. */
  getPackageEntities: (packageName: string) => Promise<MetadataEntity[]>;
  /** Read UTF-8 content for one layer file reference. */
  readLayerFile: (ref: MetadataLayerRef) => Promise<string>;
}
