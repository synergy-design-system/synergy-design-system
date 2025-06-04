/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getTokensByCategory, sortTokens } from './tokens.js';

export const exampleText = 'The quick brown fox jumps over the lazy dog.';

/**
 * Get all font-family as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete font-family tokens
 */
export const getFontFamily = (useFullTokenName = false) => {
  const fonts = ['fontsans', 'fontmono'].map((category) => {
    const fontTokens = getTokensByCategory(category, useFullTokenName);
    return Object.fromEntries(fontTokens);
  });
  return {
    ...fonts[0],
    ...fonts[1],
  };
};

/**
 * Get all font-sizes as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete font-size tokens
 */
export const getFontSize = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('fontsize', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, {
    orderArray: [
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      '2xlarge',
      '3xlarge',
      '4xlarge',
    ],
    replaceString: 'synfontsize',
    sortType: 'order',
  })));

/**
 * Get all font-weight as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete font-weight tokens
 */
export const getFontWeight = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('fontweight', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, {
    orderArray: [
      'normal',
      'semibold',
      'bold',
    ],
    replaceString: 'synfontweight',
    sortType: 'order',
  })));

/**
 * Get all line-height as object
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete line-height tokens
 */
export const getLineHeight = (useFullTokenName = false) => Object.fromEntries(getTokensByCategory('lineheight', useFullTokenName)
  .sort((a, b) => sortTokens(a, b, {
    orderArray: [
      'denser',
      'dense',
      'normal',
      'loose',
      'looser',
    ],
    replaceString: 'synlineheight',
    sortType: 'order',
  })));
