import StyleDictionary from 'style-dictionary';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

export const createCssVariablesForCss = {
  formatter({ dictionary, file, options }) {
    const { outputReferences } = options;

    const isTokenColor = (token) => !token?.name.includes('syn-color') && typeof token?.original?.value === 'string' && token.original.value.includes('{');
    const convertOriginalToCssVar = (token) => {
      if (isTokenColor(token)) {
        token.value = `var(--syn-${token.original.type === 'color' && !token.original.value.includes('color') ? 'color-' : ''}${token.original.value
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
};

export const createCssVariablesForScss = {
  formatter({ dictionary, file, options }) {
    const { outputReferences } = options;

    const isTokenColor = (token) => token?.original?.value && typeof token.original.value === 'string' && token.original.value.includes('{');

    const convertOriginalToCssVar = (token) => {
      if (isTokenColor(token)) {
        let tokenName = token.path.join('-');
        if (token.original.type === 'color') {
          tokenName = `color-${tokenName}`;
        }
        token.value = `var(--syn-${tokenName})`;
      }
      return token;
    };

    const convertOriginalToScssVarRecursive = (dict) => {
      Object.keys(dict).forEach((key) => {
        if (dict[key].value) {
          dict[key] = convertOriginalToCssVar(dict[key]);
        } else if (typeof dict[key] === 'object') {
          convertOriginalToScssVarRecursive(dict[key]);
        }
      });
    };

    convertOriginalToScssVarRecursive(dictionary.properties);

    let scssString = formattedVariables({ dictionary, format: 'scss', outputReferences });
    scssString = scssString.split('\n')
      .map(line => {
        if (line.trim() === '') return line;
        return `$${line.trim().replace(' =', ':')}`;
      })
      .join('\n');

    return `${fileHeader({ file })}${scssString}`;
  },
  name: 'syn/create-css-variables-for-scss',
};
