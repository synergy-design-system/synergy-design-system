/**
 * Check if the given token is a primitive
 * @param {object} token
 * @returns {boolean}
 */
const isPrimitive = token => token.filePath.includes('primitive');

/**
 * Check if the given token is a typography token.
 * @param {object} token
 * @returns {boolean}
 */
const isTypoToken = token => token.type === 'typography';

/**
 * Check if the given token is a wanted typography token
 * This is given if we have a heading type token OR
 * a body type token ending in -regular
 * @param {object} token
 * @returns {boolean}
 */
const isWantedTypoToken = ({
  name,
}) => name.includes('-heading-') || (name.includes('-body-') && name.endsWith('regular'));

/**
 * Default filter for synergy
 */
export const synFilterDefault = {
  matcher: (token) => {
    // Skip primitives
    if (isPrimitive(token)) {
      return false;
    }

    // Skip invalid typo tokens
    if (isTypoToken(token) && !isWantedTypoToken(token)) {
      return false;
    }

    return true;
  },
  name: 'syn-filter-default',
};
