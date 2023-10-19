import StyleDictionary from 'style-dictionary';
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

export const createCssVariables = (prefix) => ({
  formatter({ dictionary, file, options }) {
    const { outputReferences } = options;

    const isTokenColor = (token) => {
      // if (token.type !== 'color') return false;
      return !token?.name.includes(`${prefix}color`) && !token?.name.includes(`${prefix}spacing`) && typeof token?.original?.value === 'string' && token.original.value.includes('{')
    };

    const convertOriginalToCssVar = (token) => {
      if (isTokenColor(token)) {
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
