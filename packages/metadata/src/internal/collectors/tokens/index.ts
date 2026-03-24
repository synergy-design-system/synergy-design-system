/**
 * Tokens collector pipeline: collect -> normalize
 */

import { type CoreEntity } from '../../schemas/index.js';
import { type TokensRaw, collect } from './collect.js';
import { normalize } from './normalize.js';
import { type SourcePipeline, type TokensConfig } from './types.js';

export type { TokensConfig } from './types.js';

export const tokensPipeline: SourcePipeline<TokensConfig, TokensRaw, CoreEntity> = {
  collect,
  normalize,
};
