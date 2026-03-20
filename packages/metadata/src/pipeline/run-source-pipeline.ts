/**
 * Pipeline orchestration: run a source pipeline through all stages.
 */

import { type Result } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type PipelineError } from '../core/errors.js';
import { type SourcePipeline } from '../collectors/components/index.js';

/**
 * Run a complete source pipeline: collect → validate → normalize → enrich.
 */
export async function runSourcePipeline<Cfg, Raw, Canonical>(
  pipeline: SourcePipeline<Cfg, Raw, Canonical>,
  config: Cfg,
  ctx: Context,
): Promise<Result<Canonical[], PipelineError>> {
  ctx.logger?.debug('Pipeline: collect phase starting');

  const collected = await pipeline.collect(config, ctx);
  if (!collected.ok) {
    return collected;
  }

  ctx.logger?.debug('Pipeline: normalize phase starting');
  const normalized = pipeline.normalize(collected.value);
  if (!normalized.ok) {
    return normalized;
  }

  if (!pipeline.enrich) {
    ctx.logger?.debug('Pipeline: no enrich phase');
    return normalized;
  }

  ctx.logger?.debug('Pipeline: enrich phase starting');
  return pipeline.enrich(normalized.value);
}
