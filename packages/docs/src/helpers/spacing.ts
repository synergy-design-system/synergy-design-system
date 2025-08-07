import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all spacings as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete spacing tokens
 */
export const getSpacings = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('spacing', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { extractSizeFor: 'SynSpacing', sortType: 'size' })));
