/**
 * Halves all numbers in a given string.
 * @param {string} input The input string containing numbers to be halved
 * @returns {string} The final output
 */
function halfNumbers(input) {
  return input.replace(
    /(\d*\.?\d+)([a-z%]*)/gi,
    /**
     * @param {unknown} _ The match
     * @param {string} num The numeric part
     * @param {string} unit The unit of the css value
     * @returns {string} The replaced value
     */
    (_, num, unit) => (parseFloat(num) / 2) + unit,
  );
}

/**
 * Fix figma css blur variables as they are ment to be half of the figma value.
 * Before: --syn-overlay-background-blur: 16px;
 * After: --syn-overlay-background-blur: 8px;
 *
 * @type import('style-dictionary/types').ValueTransform
 */
export const fixFigmaBackgroundBlur = {
  // Only include the overlay background for now
  filter: ({ name }) => name === 'syn-overlay-background-blur',
  name: 'syn/fix-figma-background-blur',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    /**
     * @type {{ value?: string }}
     */
    const { value } = token;

    if (!value) {
      return value;
    }

    // Figma uses double the value for its blur, so we need to halve it
    return halfNumbers(value);
  },
  type: 'value',
};
