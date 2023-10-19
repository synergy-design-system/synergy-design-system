/**
 * Custom transformation to add "color" to the main color names.
 * Example: syn-primary-500 -> syn-color-primary-500
 */

export const addColorName = {
  matcher: (token) => token.type === 'color',
  name: 'syn/add-color-name',
  transformer: (token) => {
    if (token.type === 'color' && !token.filePath.includes('semantic')) {
      token.name = token.name.replace('syn-', 'syn-color-');
    }
    return token.name;
  },
  type: 'name',
};
