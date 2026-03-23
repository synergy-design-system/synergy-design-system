/**
 * Error types used throughout the ETL pipeline.
 */

export type CollectError = {
  kind: 'collect';
  message: string;
  source?: string;
  details?: Record<string, unknown>;
};

export type NormalizeError = {
  kind: 'normalize';
  message: string;
  source?: string;
  details?: Record<string, unknown>;
};

export type EnrichError = {
  kind: 'enrich';
  message: string;
  source?: string;
  details?: Record<string, unknown>;
};

export type AggregateError = {
  kind: 'aggregate';
  message: string;
  details?: Record<string, unknown>;
};

export type ValidateError = {
  kind: 'validate';
  message: string;
  details?: Record<string, unknown>;
};

export type WriteError = {
  kind: 'write';
  message: string;
  path?: string;
  details?: Record<string, unknown>;
};

export type PipelineError =
  | CollectError
  | NormalizeError
  | EnrichError
  | AggregateError
  | ValidateError
  | WriteError;

export const createCollectError = (
  message: string,
  source?: string,
  details?: Record<string, unknown>,
): CollectError => ({
  details,
  kind: 'collect',
  message,
  source,
});

export const createNormalizeError = (
  message: string,
  source?: string,
  details?: Record<string, unknown>,
): NormalizeError => ({
  details,
  kind: 'normalize',
  message,
  source,
});

export const createEnrichError = (
  message: string,
  source?: string,
  details?: Record<string, unknown>,
): EnrichError => ({
  details,
  kind: 'enrich',
  message,
  source,
});
