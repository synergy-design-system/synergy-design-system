/**
 * Converts letter-spacing with 0 values to "normal".
 * Before: --syn-letter-spacing-normal: 0px
 * After: --syn-letter-spacing-normal: normal
 * @type import('style-dictionary/types').ValueTransform
 */
export const convertLetterSpacingValue = {
  filter: ({ name }) => name.includes('letter-spacing'),
  name: 'syn/convert-letter-spacing-to-normal',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    const { value } = token;
    if (value === '0' || value === '0px') {
      return 'normal';
    }
    return value;
  },
  type: 'value',
};
