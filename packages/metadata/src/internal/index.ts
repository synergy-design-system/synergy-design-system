/**
 * Internal-only barrel for repository tooling.
 *
 * This module is intentionally not exported from package.json and is not part
 * of the supported public API surface for consumers.
 */

export {
  type Result,
  err,
  ok,
  resultFlatMap,
  resultMap,
} from './core/result.js';

export {
  type Context,
  type Logger,
  createConsoleLogger,
  createNoOpLogger,
} from './core/context.js';

export type {
  AggregateError,
  CollectError,
  EnrichError,
  NormalizeError,
  PipelineError,
  ValidateError,
  WriteError,
} from './core/errors.js';

export type {
  CoreEntity,
  EntityKind,
  IndexEntry,
  LayerRef,
  Manifest,
  RelationRef,
  SnapshotLock,
  Status,
} from './schemas/index.js';

export {
  CoreEntitySchema,
  LayerRefSchema,
  ManifestSchema,
  SnapshotLockSchema,
  validateCoreEntity,
  validateManifest,
  validateSnapshot,
} from './schemas/index.js';

export {
  aggregateEntities,
  buildIndex,
  runSourcePipeline,
  validateEntities,
  validateManifestData,
} from './pipeline/index.js';

export {
  componentsPipeline,
  type ComponentsConfig,
} from './collectors/index.js';

export {
  writeCoreEntities,
  writeIndex,
  writeLayerAssets,
  writeManifest,
  writeSchemas,
} from './writers/index.js';
