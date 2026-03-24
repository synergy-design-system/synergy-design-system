export { createMetadataStore } from './store.js';
export { getAssetMetadata, listAssets, searchIcons } from './domains/assets.js';
export { getComponentMetadata, listComponents } from './domains/components.js';
export { getFontMetadata, listFonts } from './domains/fonts.js';
export { getMigrations } from './domains/migrations.js';
export { getStyleMetadata, listStyles } from './domains/styles.js';
export { getTokens } from './domains/tokens.js';

export type {
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
  PublicError,
  PublicErrorCode,
  PublicRequestOptions,
  PublicResponse,
  PublicResponseMeta,
  Verbosity,
} from './types.js';
