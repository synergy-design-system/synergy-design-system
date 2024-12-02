/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * Add support for fallback fonts to the font-family tokens
 * @type import('style-dictionary/types').ValueTransform addMissingQuotesForStrings
 */
export const addMissingQuotesForStrings = {
  filter: ({ type }) => type === 'content',
  name: 'syn/add-missing-quotes-for-strings',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    const { value } = token;

    let finalValue = value;
    if (!value.startsWith('"')) {
      finalValue = `"${finalValue}`;
    }
    if (!value.endsWith('"')) {
      finalValue = `${finalValue}"`;
    }
    return finalValue;
  },
  type: 'value',
};
