/**
 * Shared types for the components collector pipeline.
 */

/**
 * Configuration for the components collector and framework enrichments.
 */
export interface ComponentsConfig {
  angularPackagePath?: string;
  packagePath: string;
  reactPackagePath?: string;
  vuePackagePath?: string;
}

/**
 * Generic collector pipeline type.
 */
export interface SourcePipeline<Cfg, Raw, Canonical> {
  collect: (cfg: Cfg, ctx: import('../../core/context.js').Context) => Promise<import('../../core/result.js').Result<Raw, import('../../core/errors.js').PipelineError>>;
  normalize: (raw: Raw) => import('../../core/result.js').Result<Canonical[], import('../../core/errors.js').PipelineError>;
  enrich?: (
    records: Canonical[],
    cfg: Cfg,
    ctx: import('../../core/context.js').Context,
  ) => Promise<import('../../core/result.js').Result<Canonical[], import('../../core/errors.js').PipelineError>>;
}
