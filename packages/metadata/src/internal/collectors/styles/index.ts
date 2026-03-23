/**
 * Styles collector pipeline: collect -> normalize
 */

import { type CoreEntity } from '../../schemas/index.js';
import { type StylesRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { type StylesConfig, type SourcePipeline } from './types.js';

export type { StylesConfig } from './types.js';

export const stylesPipeline: SourcePipeline<StylesConfig, StylesRaw, CoreEntity> = {
  collect,
  normalize,
};
