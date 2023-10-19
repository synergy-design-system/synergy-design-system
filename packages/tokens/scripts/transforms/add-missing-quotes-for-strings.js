/**
 * @var supportedTypes List of supported token types we apply the calculation to
 * @type String[]
 */
const supportedTypes = [
  'text',
];

/**
 * Custom transform used for adding calc() around variables that need it.
 * @see https://github.com/amzn/style-dictionary/issues/820
 */
export const addQuotesForStrings = {
  matcher: ({ type }) => supportedTypes.includes(type),
  name: 'syn/add-missing-quotes-for-strings',
  transformer: ({ value }) => {
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
