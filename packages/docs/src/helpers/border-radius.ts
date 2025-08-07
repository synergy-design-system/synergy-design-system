import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all border radii as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete border radius tokens
 */
export const getBorderRadius = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('borderradius', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { extractSizeFor: 'SynBorderRadius', sortType: 'size' })));
