/**
 * Public API types for querying metadata artifacts.
 * These types intentionally avoid coupling to internal collector/pipeline modules.
 */

import type { ComponentRules } from '../config/types.js';

/** Logical metadata layer names used for query and response shaping. */
export type LayerName = 'full' | 'interface' | 'examples';
/** Verbosity levels for response formatting in public query helpers. */
export type Verbosity = 'readable' | 'compact' | 'minified';

// ---------------------------------------------------------------------------
// Component custom types
// ---------------------------------------------------------------------------

/** Named documentation item with free-text description. */
export type ComponentNamedDescription = {
  description: string;
  name: string;
};

/** Component interface attribute metadata extracted from docs/source. */
export type ComponentInterfaceAttribute = {
  default?: string;
  description: string;
  fieldName?: string;
  name: string;
  reflects: boolean;
  type?: string;
};

/** Component interface property metadata extracted from docs/source. */
export type ComponentInterfaceProperty = {
  access: 'public' | 'readonly';
  default?: string;
  description: string;
  name: string;
  type?: string;
};

/** Component method metadata extracted from docs/source. */
export type ComponentInterfaceMethod = {
  description: string;
  name: string;
  parameters: Array<{ name: string; type?: string }>;
  returnType?: string;
};

/** Component custom event metadata extracted from docs/source. */
export type ComponentInterfaceEvent = {
  description: string;
  name: string;
  type?: string;
};

/** Normalized interface snapshot for one web component. */
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

/** Angular-specific component integration metadata. */
export type ComponentAngularCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  selector: string;
  sourcePath: string;
};

/** React wrapper component integration metadata. */
export type ComponentReactWrapperCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

/** React JSX type integration metadata. */
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

/** Vue-specific component integration metadata. */
export type ComponentVueCustom = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

/** Component-specific custom metadata payload. */
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
  rules?: ComponentRules;
};

// ---------------------------------------------------------------------------
// Font custom types
// ---------------------------------------------------------------------------

/** Font artifact metadata. */
export type FontCustom = {
  artifactPath?: string;
  artifactType?: string;
};

// ---------------------------------------------------------------------------
// Style custom types
// ---------------------------------------------------------------------------

/** Style entity custom metadata. */
export type StyleCustom = {
  moduleName?: string;
};

// ---------------------------------------------------------------------------
// Token custom types
// ---------------------------------------------------------------------------

/** Token entity custom metadata. */
export type TokenCustom = {
  artifactPath?: string;
  format?: 'css' | 'javascript' | 'sass' | 'figma';
  sourceType?: string;
  theme?: 'sick2025-light' | 'sick2025-dark' | 'sick2018-light' | 'sick2018-dark';
};

// ---------------------------------------------------------------------------
// Migration custom types
// ---------------------------------------------------------------------------

/** Migration entity custom metadata. */
export type MigrationCustom = {
  migrationType?: string;
  versions?: string[];
};

// ---------------------------------------------------------------------------
// Setup custom types
// ---------------------------------------------------------------------------

/** Setup entity custom metadata. */
export type SetupCustom = {
  artifactGroups?: Record<string, string[]>;
  exports?: string[];
  framework?: 'angular' | 'react' | 'vue';
  migrationType?: string;
  moduleClass?: string;
  packageName?: string;
  packageVersion?: string;
  subpathExports?: string[];
  validators?: string[];
  valueAccessors?: string[];
  versions?: string[];
};

// ---------------------------------------------------------------------------
// Asset custom types
// ---------------------------------------------------------------------------

/** Metadata for one icon inside an icon-set asset. */
export type AssetIconData = {
  categories?: string[];
  tags?: string[];
};

/** Icon-set asset custom metadata. */
export type AssetIconSetCustom = {
  exportName: string;
  iconCount: number;
  icons: Record<string, AssetIconData>;
  theme: string;
  variant: string;
};

/** Logo asset custom metadata. */
export type AssetLogoCustom = {
  category: string;
  files: string[];
  theme: string;
};

/** System-icon asset custom metadata. */
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

/** Common request options shared by public domain query helpers. */
export type PublicRequestOptions = {
  includeLayerRefs?: boolean;
  includeSources?: boolean;
  layer?: LayerName;
  limit?: number;
  offset?: number;
  strictLayer?: boolean;
  verbosity?: Verbosity;
};

/** Standardized public error code set for metadata APIs. */
export type PublicErrorCode =
  | 'DATA_NOT_READY'
  | 'INTERNAL_ERROR'
  | 'INVALID_LAYER'
  | 'INVALID_QUERY'
  | 'INVALID_VERBOSITY'
  | 'LAYER_NOT_AVAILABLE'
  | 'NOT_FOUND';

/** Public error payload returned by metadata APIs. */
export type PublicError = {
  code: PublicErrorCode;
  details?: Record<string, unknown>;
  message: string;
};

/** Shared response metadata envelope returned by metadata APIs. */
export type PublicResponseMeta = {
  builtAt: string;
  requestedLayer: LayerName;
  requestedVerbosity: Verbosity;
  resolvedLayer: LayerName;
  schemaVersion: string;
  total: number;
  warnings?: string[];
};

/** Generic public response wrapper used by metadata APIs. */
export type PublicResponse<T> = {
  data: T;
  errors?: PublicError[];
  meta: PublicResponseMeta;
};

/** Relation reference from one entity to another. */
export type MetadataRelationRef = {
  id: string;
  kind: string;
};

/** Reference to one generated layer file. */
export type MetadataLayerRef = {
  layer: string;
  path: string;
};

/** Canonical metadata entity shape used across public APIs. */
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

/** Entity alias for icon-set assets. */
export type AssetIconSetEntity = MetadataEntity<AssetIconSetCustom>;
/** Entity alias for logo assets. */
export type AssetLogoEntity = MetadataEntity<AssetLogoCustom>;
/** Entity alias for system-icon assets. */
export type AssetSystemIconEntity = MetadataEntity<AssetSystemIconCustom>;
/** Entity alias for mixed asset payloads. */
export type AssetEntity = MetadataEntity<AssetCustom>;
/** Entity alias for component payloads. */
export type ComponentEntity = MetadataEntity<ComponentCustom>;
/** Aggregated component cluster entry returned by cluster APIs. */
export type ComponentCluster = {
  category?: string;
  componentCount: number;
  componentIds: string[];
  description?: string;
  id: string;
  name: string;
};
/** Entity alias for font payloads. */
export type FontEntity = MetadataEntity<FontCustom>;
/** Entity alias for migration payloads. */
export type MigrationEntity = MetadataEntity<MigrationCustom>;
/** Entity alias for setup payloads. */
export type SetupEntity = MetadataEntity<SetupCustom>;
/** Entity alias for style payloads. */
export type StyleEntity = MetadataEntity<StyleCustom>;
/** Entity alias for token payloads. */
export type TokenEntity = MetadataEntity<TokenCustom>;

/** One index entry describing how to locate and search an entity. */
export type MetadataIndexEntry = {
  corePath: string;
  id: string;
  kind: string;
  layers?: Record<string, number>;
  name: string;
  search: string[];
};

/** Root metadata index structure stored in data/index.json. */
export type MetadataIndex = {
  entities: MetadataIndexEntry[];
  builtAt: string;
  version: string;
};

/** Filter options for low-level metadata store queries. */
export type MetadataQuery = {
  id?: string;
  kind?: string;
  layer?: LayerName;
  package?: string;
  status?: string;
  tags?: string[];
};

/** Runtime options for constructing a metadata store. */
export type MetadataStoreOptions = {
  dataDir?: string;
};

/** Matching mode used by icon search filter groups. */
export type IconFilterMode = 'and' | 'or';

/** Query object for searching icons across one or more icon-set assets. */
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

/** One icon search hit with icon-set and categorization context. */
export type IconSearchResult = {
  assetId: string;
  iconName: string;
  categories: string[];
  tags: string[];
  theme?: string;
  variant?: string;
};

/** Public low-level metadata store interface for entity and layer access. */
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
