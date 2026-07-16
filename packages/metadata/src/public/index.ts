import {
  findComponentsForTask as experimentalFindComponentsForTask,
  getComponentGuide as experimentalGetComponentGuide,
  getIntentCategory as experimentalGetIntentCategory,
  getIntentOptions as experimentalGetIntentOptions,
  getTargetCapabilities as experimentalGetTargetCapabilities,
  listIntentCapabilities as experimentalListIntentCapabilities,
  listIntentCategories as experimentalListIntentCategories,
  listIntents as experimentalListIntents,
  renderIntent as experimentalRenderIntent,
  resolveIntent as experimentalResolveIntent,
  validateComponent as experimentalValidateComponent,
} from './domains/intent-policy.js';

export { clearMetadataStoreCache, createMetadataStore, getMetadataInfo } from './store.js';
export { generateSkillBundle } from './skill-bundle.js';
export { getSynergyLogo } from './branding.js';
export type { SkillBundleOptions } from './skill-bundle.js';
export { getAssetMetadata, listAssets, searchIcons } from './domains/assets.js';
export { listComponentClusters, listComponentsByCluster } from './domains/clusters.js';
export {
  getComponentMetadata,
  getDataForComponent,
  getRulesForComponent,
  listComponents,
} from './domains/components.js';
export { getFontMetadata, listFonts } from './domains/fonts.js';
export { getMigrations } from './domains/migrations.js';
export { getDataForSetup } from './domains/setup.js';
export { getDataForStyle, getStyleMetadata, listStyles } from './domains/styles.js';
export { getTemplateMetadata, getDataForTemplate, listTemplates } from './domains/templates.js';
export { getDataForTokens, getTokens } from './domains/tokens.js';
export { collectLayerReferences, readLayerFilesForEntity } from './utils.js';

export type { AssetQueryOptions, IconSearchOptions } from './domains/assets.js';
export type {
  ClusterComponentQueryOptions,
  ClusterQueryOptions,
} from './domains/clusters.js';
export type {
  ComponentDataLayer,
  ComponentDataPayload,
  ComponentDataQueryOptions,
  ComponentFramework,
  ComponentFrameworkDetails,
  ComponentLayerContent,
  ComponentQueryOptions,
  ComponentRulesPayload,
  ComponentTextLayerContent,
} from './domains/components.js';
export type { FontQueryOptions } from './domains/fonts.js';
export type {
  ComponentGuideQuery as ExperimentalComponentGuideQuery,
  ComponentGuideResult as ExperimentalComponentGuideResult,
  FindComponentsForTaskQuery as ExperimentalFindComponentsForTaskQuery,
  FindComponentsForTaskResult as ExperimentalFindComponentsForTaskResult,
  IntentOptionsQuery as ExperimentalIntentOptionsQuery,
  IntentOptionsResult as ExperimentalIntentOptionsResult,
  IntentCategoryQueryOptions as ExperimentalIntentCategoryQueryOptions,
  IntentListQueryOptions as ExperimentalIntentListQueryOptions,
  IntentPhaseQueryOptions as ExperimentalIntentPhaseQueryOptions,
  IntentRenderQuery as ExperimentalIntentRenderQuery,
  IntentResolutionQuery as ExperimentalIntentResolutionQuery,
  ValidateComponentQuery as ExperimentalValidateComponentQuery,
  ValidateComponentResult as ExperimentalValidateComponentResult,
} from './domains/intent-policy.js';
export type { MigrationQueryOptions } from './domains/migrations.js';
export type {
  SetupDataPayload,
  SetupDataQueryOptions,
  SetupEntry,
  SetupPackage,
  SetupTextLayerContent,
} from './domains/setup.js';
export type {
  StyleDataLayer,
  StyleDataPayload,
  StyleDataQueryOptions,
  StyleQueryOptions,
  StyleTextLayerContent,
} from './domains/styles.js';
export type {
  TemplateDataLayer,
  TemplateDataPayload,
  TemplateDataQueryOptions,
  TemplateQueryOptions,
  TemplateTextLayerContent,
} from './domains/templates.js';
export type {
  TokenDataContent,
  TokenDataPayload,
  TokenDataQueryOptions,
  TokenFormat,
  TokenQueryOptions,
  TokenTheme,
} from './domains/tokens.js';

export type {
  AssetCustom,
  AssetEntity,
  AssetIconData,
  AssetIconSetCustom,
  AssetIconSetEntity,
  AssetLogoCustom,
  AssetLogoEntity,
  AssetSystemIconCustom,
  AssetSystemIconEntity,
  ComponentAngularCustom,
  ComponentCluster,
  ComponentCustom,
  ComponentEntity,
  ComponentInterfaceAttribute,
  ComponentInterfaceEvent,
  ComponentInterfaceMethod,
  ComponentInterfaceProperty,
  ComponentInterfaceSnapshot,
  ComponentNamedDescription,
  ComponentReactJsxCustom,
  ComponentReactWrapperCustom,
  ComponentVueCustom,
  FontCustom,
  FontEntity,
  FrameworkProfile,
  IconFilterMode,
  IconSearchQuery,
  IconSearchResult,
  LayerName,
  MetadataEntity,
  MetadataIndex,
  MetadataIndexEntry,
  MetadataLayerRef,
  MetadataQuery,
  MetadataRelationRef,
  MetadataStore,
  MetadataStoreOptions,
  MigrationCustom,
  MigrationEntity,
  IntentCapability,
  IntentCategory,
  IntentDefinition,
  IntentPhase,
  IntentPreset,
  IntentPresetValue,
  IntentResolutionResult,
  IntentTargetKind,
  IntentTargetRef,
  IntentStructureNode,
  IntentUsagePattern,
  SetupCustom,
  SetupEntity,
  PublicError,
  PublicErrorCode,
  PublicRequestOptions,
  PublicResponse,
  PublicResponseMeta,
  StyleCustom,
  StyleEntity,
  TokenCustom,
  TokenEntity,
  Verbosity,
} from './types.js';

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_getIntentCategory = experimentalGetIntentCategory;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_getTargetCapabilities = experimentalGetTargetCapabilities;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_getComponentGuide = experimentalGetComponentGuide;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_getIntentOptions = experimentalGetIntentOptions;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_listIntentCategories = experimentalListIntentCategories;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_listIntentCapabilities = experimentalListIntentCapabilities;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_listIntents = experimentalListIntents;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_findComponentsForTask = experimentalFindComponentsForTask;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_renderIntent = experimentalRenderIntent;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_resolveIntent = experimentalResolveIntent;

/**
 * Experimental API export.
 *
 * @experimental
 */
// eslint-disable-next-line camelcase
export const experimental_validateComponent = experimentalValidateComponent;
