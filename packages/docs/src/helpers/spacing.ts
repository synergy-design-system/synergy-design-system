/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all spacings as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete spacing tokens
 */
export const getSpacings = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('spacing', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, {
    orderArray: [
      '4xsmall',
      '3xsmall',
      '2xsmall',
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      '2xlarge',
      '3xlarge',
      '4xlarge',
      '5xlarge',
    ],
    replaceString: 'synspacing',
    sortType: 'order',
  })));
