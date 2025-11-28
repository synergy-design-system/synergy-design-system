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
      themeInformation,
      verbosity,
    } = options;

    const { cssSelectors, mode, theme } = themeInformation;
    const header = await fileHeader({ file });

    /**
     * Detects if the token name is valid.
     * If you need some other prefixes, append them to the array
     * @param {string} name The name of the token
     * @returns {boolean} If the token is valid
     */
    const isValidTokenName = (name = '') => (![
      'body',
      'color',
      'heading',
      'input-border-width',
      'input-disabled-opacity',
      'spacing',
      'transition',
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

    const BACKWARDS_COMPATIBLE_VARIABLES = [
      {
        name: 'syn-tooltip-line-height',
        value: 'var(--syn-line-height-normal)',
      },
    ];

    /**
     * @type {string[]} List of variables that should be ignored for the brand 2025 theme
     */
    const BRAND2025_IGNORE_PATTERNS = [
      // Unknown component, skipping for now
      'typography-color-text-quiet',
      'typography-color-text-quiet-inverted',

      'progress-track-readonly-color',

      'progress-track-readonly-color',

      'input-border-color-active',
      'input-icon-icon-clearable-color-active',
      'interactive-background-color-active',
      // Readonly color are needed later
      'readonly-border-color',
      'readonly-indicator-color',
      'readonly-opacity-color',
      'range-color-readonly',

      // Font Style tokens are needed later
      'body-2x-small-regular',
      'body-2x-small-semibold',
      'body-2x-small-bold',
      'heading-4x-large',

      // Button tokens are needed later
      'button-outline-color-text',
    ].map(v => `${prefix}${v}`);

    /**
     * @type {string[]} List of already ignored variables (to not spam the console)
     */
    const alreadyIgnoredList = [];

    /**
     * Converts a design tokens value to a css var
     * @param {import ('style-dictionary/types').DesignToken} token
     * @returns {token}
     */
    const convertOriginalToCssVar = (token) => {
      // To be backwards compatible and do not need a major version, we need to convert some tokens to their old value
      const compatibilityVariable = BACKWARDS_COMPATIBLE_VARIABLES.find(v => v.name === token.name);
      if (compatibilityVariable) {
        token.value = compatibilityVariable.value;
        return token;
      }

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
          const name = dict[key]?.name;
          if (name && BRAND2025_IGNORE_PATTERNS.includes(name)) {
            alreadyIgnoredList.push(name);
            delete dict[key];
            return;
          }
          dict[key] = convertOriginalToCssVar(dict[key]);
        }
      });
    };
    convertOriginalToCssVarRecursive(dictionary);

    if (verbosity !== 'silent' && alreadyIgnoredList.length > 0) {
      const finalOutputList = Array.from(
        new Set(
          alreadyIgnoredList
            .sort((a, b) => a.localeCompare(b)),
        ),
      )
        .map(name => `    -❔ ${name}`)
        .join('\n');
      console.warn(`
⚠️  Some variables where ignored for ${theme}.
⚠️  If you want them to appear, please remove them from BRAND2025_IGNORE_PATTERNS!
⚠️  Ignored variables:
${finalOutputList}
`.trimStart());
    }

    return `
${header}${cssSelectors.join(', ')} {
  color-scheme: ${mode};

${formattedVariables({
      dictionary,
      format: 'css',
    })}
}
`.trimStart();
  },
  name: 'syn/css-variable-formatter',
};
