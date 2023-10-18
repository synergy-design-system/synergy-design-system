
export const addFallbackFonts = {
  matcher: (token) => token.type === 'fontFamilies',
  name: 'syn/add-fallback-fonts',
  transformer: (token) => {
    if (token.name.includes('sans')) {
      token.value += `, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;
    } else if (token.name.includes('serif')) {
      token.value += ', Georgia, \'Times New Roman\', Times, serif';
    } else if (token.name.includes('mono')) {
      token.value += ', SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace';
    }
      return token.value;
  },
  type: 'value',
};
