/**
 * Fonts collector pipeline: collect -> normalize
 */

import { type CoreEntity } from '../../schemas/index.js';
import { type FontsRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { type FontsConfig, type SourcePipeline } from './types.js';

export type { FontsConfig } from './types.js';

export const fontsPipeline: SourcePipeline<FontsConfig, FontsRaw, CoreEntity> = {
  collect,
  normalize,
};
