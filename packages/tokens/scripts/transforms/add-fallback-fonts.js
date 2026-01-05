/**
 * Add support for fallback fonts to the font-family tokens
 * Before: --syn-font-sans: 'Open Sans'
 * After: --syn-font-sans: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
 *
 * @type import('style-dictionary/types').ValueTransform
 */
export const addFallbackFonts = {
  filter: token => token.type === 'fontFamily',
  name: 'syn/add-fallback-fonts',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    if (token.name.includes('sans') && !token.name.includes('sans-fallback')) {
      token.value += ", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
    } else if (token.name.includes('mono')) {
      token.value += ', SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace';
    }

    return token.value;
  },
  type: 'value',
};
