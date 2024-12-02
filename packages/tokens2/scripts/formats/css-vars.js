import { fileHeader, formattedVariables } from 'style-dictionary/utils';

/**
 * Adjusts color tokens to use the `color` prefix
 * Before: syn-primary-50
 * After: syn-color-primary-50
 *
 * @type import('style-dictionary/types').Format cssVariableFormatter
 */
export const cssVariableFormatter = {
  format: ({
    dictionary,
    file,
    options,
  }) => {
    const {
      prefix,
      theme,
    } = options;

    const bodySelector = `.${prefix}theme-${theme}`;

    return `
:root, ${bodySelector} {
  color-scheme: ${theme};
${formattedVariables({
  dictionary,
  format: 'css',
})}
}`.trim();
  },
  name: 'syn/css-variable-formatter',
};
