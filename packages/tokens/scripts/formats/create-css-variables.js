import StyleDictionary from 'style-dictionary';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

export const createCssVariables = (prefix) => ({
  formatter({ dictionary, file, options }) {
    const { outputReferences } = options;

    // Detects if the token name is valid.
    // If you need some other prefixes, append them to the array
    const isValidTokenName = name => (![
      'color',
      'spacing',
    ]
      .map(p => `${prefix}${p}`)
      .some(p => name.startsWith(p))
    );

    // Check if a given token is valid
    const isValidToken = (token) => {
      // Skip if the prefix is not allowed
      if (!isValidTokenName(token.name)) return false;

      // We only allow strings that refer to variables
      return typeof token?.original?.value === 'string' && token.original.value.includes('{');
    };

    const convertOriginalToCssVar = (token) => {
      if (isValidToken(token)) {
        token.value = `var(--${prefix}${token.original.type === 'color' && !token.original.value.includes('color') ? 'color-' : ''}${token.original.value
          .replace('{', '')
          .replace('}', '')
          .replace('.', '-')
        })`;
      }
      return token;
    };

    // eslint-disable-next-line max-len
    // go recursively through every dictionary.property, check if it has an original value and if it does, convert it to a css var
    const convertOriginalToCssVarRecursive = (dict) => {
      Object.keys(dict).forEach((key) => {
        if (!dict[key].hasOwnProperty('original') && !dict[key].hasOwnProperty('value')) {
          convertOriginalToCssVarRecursive(dict[key]);
        } else {
          dict[key] = convertOriginalToCssVar(dict[key]);
        }
      });
    };
    convertOriginalToCssVarRecursive(dictionary);

    return `${fileHeader({ file })}:root {${formattedVariables({ dictionary, format: 'css', outputReferences })}}`;
  },
  name: 'syn/create-css-variables',
});
