/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all border widths as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete border width tokens
 */
export const getBorderWidth = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('borderwidth', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { orderArray: ['none', 'small', 'medium', 'large', 'xlarge'], replaceString: 'synborderwidth', sortType: 'order' })));
