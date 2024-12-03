import { fileHeader, formattedVariables } from 'style-dictionary/utils';

/**
 * Adjusts color tokens to use the `color` prefix
 * Before: syn-primary-50
 * After: syn-color-primary-50
 *
 * @type import('style-dictionary/types').Format cssVariableFormatter
 */
export const cssVariableFormatter = {
  format: async ({
    dictionary,
    file,
    options,
  }) => {
    const {
      prefix,
      theme,
    } = options;

    const bodySelector = `.${prefix}theme-${theme}`;
    const header = await fileHeader({ file });

    return `
${header}:root, ${bodySelector} {
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
