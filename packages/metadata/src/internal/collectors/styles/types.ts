/**
 * Shared types for the styles collector pipeline.
 */

/**
 * Configuration for the styles collector.
 */
export interface StylesConfig {
  packagePath: string;
}

/**
 * Reuse the generic collector pipeline shape used by all collectors.
 */
export type SourcePipeline<Cfg, Raw, Canonical> = import('../components/types.js').SourcePipeline<Cfg, Raw, Canonical>;
