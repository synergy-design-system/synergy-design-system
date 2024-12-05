/**
 * Adjusts color tokens to use the `color` prefix
 * Before: syn-primary-50
 * After: syn-color-primary-50
 *
 * @type import('style-dictionary/types').NameTransform
 */
export const addColorPrefix = {
  filter: token => token.type === 'color',
  name: 'syn/add-color-prefix',
  /**
   * @returns {string}
   */
  transform: (token) => {
    if (token.type === 'color' && !token.filePath.includes('semantic')) {
      token.name = token.name.replace('syn-', 'syn-color-');
    }
    return token.name;
  },
  type: 'name',
};
