/**
 * Components collector pipeline: collect → normalize → enrich
 */
import { type CoreEntity } from '../../schemas/index.js';
import { type ComponentRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { enrich } from './enrich.js';
import { type ComponentsConfig, type SourcePipeline } from './types.js';

export type { ComponentsConfig } from './types.js';

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
