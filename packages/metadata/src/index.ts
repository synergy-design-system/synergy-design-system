/**
 * @synergy-design-system/metadata
 *
 * Machine-readable metadata for the Synergy Design System.
 * Provides canonical entity records, layer assets, and searchable index.
 */

// Core types and utilities
export {
  type Result, ok, err, resultMap, resultFlatMap,
} from './core/result.js';
export {
  type Context, type Logger, createNoOpLogger, createConsoleLogger,
} from './core/context.js';
export type {
  CollectError,
  NormalizeError,
  EnrichError,
  AggregateError,
  ValidateError,
  WriteError,
  PipelineError,
} from './core/errors.js';

// Schema types and validators
export type {
  CoreEntity,
  EntityKind,
  Status,
  RelationRef,
  LayerRef,
  SnapshotLock,
  Manifest,
  IndexEntry,
} from './schemas/index.js';

export {
  validateCoreEntity,
  validateSnapshot,
  validateManifest,
  CoreEntitySchema,
  LayerRefSchema,
  SnapshotLockSchema,
  ManifestSchema,
} from './schemas/index.js';

// Pipeline functions
export {
  runSourcePipeline,
  aggregateEntities,
  buildIndex,
  validateEntities,
  validateManifestData,
} from './pipeline/index.js';

// Collectors
export { componentsPipeline, type ComponentsConfig } from './collectors/index.js';

// Writers
export {
  writeCoreEntities,
  writeLayerAssets,
  writeIndex,
  writeManifest,
} from './writers/index.js';
