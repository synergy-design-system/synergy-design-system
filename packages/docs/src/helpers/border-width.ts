import { getComponentTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all border widths as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete border width tokens
 */
export const getBorderWidth = (useFullTokenName = false) => Object.fromEntries(getComponentTokensByCategory('borderwidth', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { extractSizeFor: 'SynBorderWidth', sortType: 'size' })));
