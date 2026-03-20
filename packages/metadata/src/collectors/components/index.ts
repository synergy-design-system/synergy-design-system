/**
 * Components collector pipeline: collect → normalize → enrich
 */
import { type Result } from '../../core/result.js';
import { type PipelineError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type ComponentRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { enrich } from './enrich.js';

/**
 * Configuration for the components collector.
 */
export interface ComponentsConfig {
  packagePath: string;
}

/**
 * Generic collector pipeline type.
 */
export interface SourcePipeline<Cfg, Raw, Canonical> {
  collect: (cfg: Cfg, ctx: Context) => Promise<Result<Raw, PipelineError>>;
  normalize: (raw: Raw) => Result<Canonical[], PipelineError>;
  enrich?: (records: Canonical[]) => Result<Canonical[], PipelineError>;
}

/**
 * Components pipeline.
 */
export const componentsPipeline: SourcePipeline<
  ComponentsConfig,
  ComponentRaw,
  CoreEntity
> = {
  collect,
  enrich,
  normalize,
};
