/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all shadows as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete shadow tokens
 */
export const getShadows = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('shadow', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, {
    orderArray: [
      'medium',
      'large',
      'xlarge',
      'overflowdown',
      'overflowup',
      'overflowleft',
      'overflowright',
    ],
    replaceString: 'synshadow',
    sortType: 'order',
  })));
