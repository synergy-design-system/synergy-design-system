/**
 * Shared types for the tokens collector pipeline.
 */

/**
 * Configuration for the tokens collector.
 */
export interface TokensConfig {
  packagePath: string;
}

/**
 * Reuse the generic collector pipeline shape used by all collectors.
 */
export type SourcePipeline<Cfg, Raw, Canonical> = import('../components/types.js').SourcePipeline<Cfg, Raw, Canonical>;
