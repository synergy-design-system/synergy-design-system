/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

/**
 * Exchanges all occurrences of referenced tokens for their css variable counterpart.
 * Input: --syn-color-something: {SynColor500}
 * Output: --syn-color-something: var(--syn-color-500)
 *
 * @type import('style-dictionary/types').Format
 */
export const cssVariableFormatter = {
  format: async ({
    dictionary,
    file,
    options,
  }) => {
    const {
      prefix,
      selector,
      theme,
    } = options;

    const header = await fileHeader({ file });

    /**
     * Detects if the token name is valid.
     * If you need some other prefixes, append them to the array
     * @param {string} name The name of the token
     * @returns {boolean} If the token is valid
     */
    const isValidTokenName = (name = '') => (![
      'color',
      'font',
      'spacing',
    ]
      .map(p => `${prefix}${p}`)
      .some(p => name.startsWith(p))
    );

    /**
     * Check if a given token is valid
     * @param {import ('style-dictionary/types').DesignToken} token
     * @returns {boolean}
     */
    const isValidToken = token => {
      // Skip if the prefix is not allowed
      if (!isValidTokenName(token.name)) return false;

      // We only allow strings that refer to variables
      return typeof token?.original?.value === 'string' && token.original?.value.includes('{');
    };

    /**
     * Converts a design tokens value to a css var
     * @param {import ('style-dictionary/types').DesignToken} token
     * @returns {token}
     */
    const convertOriginalToCssVar = (token) => {
      if (isValidToken(token)) {
        // eslint-disable-next-line max-len
        token.value = `var(--${prefix}${token.original.type === 'color' && !token.original.value.includes('color') ? 'color-' : ''}${token.original.value
          .replace('{', '')
          .replace('}', '')
          .replaceAll('.', '-')
        })`;
      }
      return token;
    };

    /**
     * Go recursively through every dictionary.property,
     * check if it has an original value and if it does, convert it to a css var
     * @param {import('style-dictionary/types').Dictionary & { [key: string]: any }} dict
     */
    const convertOriginalToCssVarRecursive = (dict) => {
      Object.keys(dict).forEach((key) => {
        if (
          !Object.prototype.hasOwnProperty.call(dict[key], 'original')
          && !Object.prototype.hasOwnProperty.call(dict[key], 'value')
        ) {
          convertOriginalToCssVarRecursive(dict[key]);
        } else {
          dict[key] = convertOriginalToCssVar(dict[key]);
        }
      });
    };
    convertOriginalToCssVarRecursive(dictionary);

    return `
${header}:root, ${selector} {
  color-scheme: ${theme};

${formattedVariables({
  dictionary,
  format: 'css',
})}
}
`.trimStart();
  },
  name: 'syn/css-variable-formatter',
};
