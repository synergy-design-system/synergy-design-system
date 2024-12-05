/**
 * Add the missing quotes for various definitions.
 * Before: content: *;
 * After: content: "*";
 *
 * @type import('style-dictionary/types').ValueTransform
 */
export const addMissingQuotesForStrings = {
  filter: ({ type }) => type === 'content',
  name: 'syn/add-missing-quotes-for-strings',
  /**
   * @returns {unknown}
   */
  transform: (token) => {
    const { value } = token;

    let finalValue = value;
    if (!value.startsWith('"')) {
      finalValue = `"${finalValue}`;
    }
    if (!value.endsWith('"')) {
      finalValue = `${finalValue}"`;
    }
    return finalValue;
  },
  type: 'value',
};
