import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all shadows as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete shadow tokens
 */
export const getShadows = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('shadow', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { extractSizeFor: 'SynShadow', sortType: 'size' })));
