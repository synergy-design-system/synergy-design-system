/**
 * @var supportedCalculations List of supported calculations
 * @type String[]
 */
const supportedCalculations = [
  '*',
  '/',
  '+',
  // @todo: Allow - as operation.
  // This is more hard to do because we also have variables or fonts in our values
  // '-',
];

/**
 * Custom transform used for adding calc() around variables that need it.
 * @see https://github.com/amzn/style-dictionary/issues/820
 */
export const calc = {
  matcher: ({ value }) => typeof value === 'string' && supportedCalculations.find((calcChar) => value.includes(calcChar)),
  name: 'sds/calc',
  transformer: ({ value }) => {
    // CSS Calc syntax needs a whitespace before AND after the calculation because:
    //   calc(4px * 3); <-- valid
    //   calc(4px *3);  <-- invalid
    const output = value
      .replace(/\*/g, ' * ') // Make sure we have a whitespace after our calculation char
      .replace(/\//g, ' / ') // Make sure we have a whitespace after our calculation char
      .replace(/\+/g, ' + ') // Make sure we have a whitespace after our calculation char
      .replace(/\s+/g, ' ') // Make sure to use just one whitespace
      .trim();

    return `calc(${output})`;
  },
  transitive: true,
  type: 'value',
};
