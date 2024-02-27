import StyleDictionary from 'style-dictionary';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

export const createCssVariables = (prefix) => ({
  formatter({ dictionary, file, options }) {
    const {
      outputReferences,
      theme,
    } = options;

    const bodySelector = `.${prefix}theme-${theme}`;

    // Detects if the token name is valid.
    // If you need some other prefixes, append them to the array
    const isValidTokenName = name => (![
      'color',
      'spacing',
    ]
      .map(p => `${prefix}${p}`)
      .some(p => name.startsWith(p))
    );

    /**
     * Check if the given token is a valid string token
     * @param {object} token
     * @returns {boolean}
     */
    const isValidStringToken = (token) => {
      // Skip if the prefix is not allowed
      if (!isValidTokenName(token.name)) return false;

      // We only allow strings that refer to variables
      return typeof token?.original?.value === 'string' && token.original.value.includes('{');
    };

    /**
     * Check if the given token is a valid typography token
     * @param {object} token
     * @returns {boolean}
     */
    const isValidTypographyToken = (token) => {
      // Skip if the prefix is not allowed
      if (!isValidTokenName(token.name)) return false;

      // We only operate on typography tokens
      return token.type === 'typography';
    };

    /**
     * Changes the given tokens value by stripping the special {} syntax chars
     * @param {string} tokenValue The token value to change
     * @returns {string} The changed token
     */
    const createCssVarName = (tokenValue) => `var(--${prefix}${tokenValue
      .replace('{', '')
      .replace('}', '')
      .replace('.', '-')
    })`;

    const convertOriginalToCssVar = (token) => {
      if (isValidStringToken(token)) {
        // Make sure to include the color prefix if it is not provided in the token.
        // This is done as we did not want the part "color" to appear twice when using the tokens.
        // However, this makes it needed to add it later on in the transformation
        const usedPrefix = token.original.type === 'color' && !token.original.value.includes('color')
          ? 'color-'
          : '';

        const nextValue = `${usedPrefix}${token.original.value}`;
        token.value = createCssVarName(nextValue);
      }

      // When operating on typography tokens, make sure to take all sub keys into account
      // Also we will remove the fontWeight from the original files as we do not want this here
      if (isValidTypographyToken(token)) {
        const {
          fontFamily,
          // Ignore the font weight.
          // We opt to just use helper classes for this to work
          // fontWeight,
          fontSize,
          lineHeight,
        } = token.original.value;
        token.value = `${createCssVarName(fontSize)}/${createCssVarName(lineHeight)} ${createCssVarName(fontFamily)}`;
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

    return `${fileHeader({ file })}:root, ${bodySelector} {
  color-scheme: ${theme};
${formattedVariables({ dictionary, format: 'css', outputReferences })}
}`;
  },
  name: 'syn/create-css-variables',
});
