/**
 * Add support for fallback fonts to the font-family tokens
 * @type import('style-dictionary/types').ValueTransform addFallbackFonts
 */
export const addFallbackFonts = {
  filter: token => token.type === 'fontFamily',
  name: 'syn/add-fallback-fonts',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    if (token.name.includes('sans')) {
      // eslint-disable-next-line max-len
      token.value += ", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
    } else if (token.name.includes('serif')) {
      token.value += ', Georgia, \'Times New Roman\', Times, serif';
    } else if (token.name.includes('mono')) {
      token.value += ', SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace';
    }

    return token.value;
  },
  type: 'value',
};
