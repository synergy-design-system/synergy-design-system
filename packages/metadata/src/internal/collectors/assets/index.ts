/**
 * Assets collector pipeline: collect -> normalize
 */

import { type CoreEntity } from '../../schemas/index.js';
import { type AssetsRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { type AssetsConfig, type SourcePipeline } from './types.js';

export type { AssetsConfig } from './types.js';

export const assetsPipeline: SourcePipeline<AssetsConfig, AssetsRaw, CoreEntity> = {
  collect,
  normalize,
};
