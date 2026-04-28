/**
 * Shared types for the assets collector pipeline.
 */

/**
 * Configuration for the assets collector.
 */
export interface AssetsConfig {
  packagePath: string;
}

/**
 * Reuse the generic collector pipeline shape used by all collectors.
 */
export type SourcePipeline<Cfg, Raw, Canonical> = import('../components/types.js').SourcePipeline<Cfg, Raw, Canonical>;
