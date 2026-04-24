/**
 * Shared types for the fonts collector pipeline.
 */

/**
 * Configuration for the fonts collector.
 */
export interface FontsConfig {
  packagePath: string;
}

/**
 * Reuse the generic collector pipeline shape used by all collectors.
 */
export type SourcePipeline<Cfg, Raw, Canonical> = import('../components/types.js').SourcePipeline<Cfg, Raw, Canonical>;
