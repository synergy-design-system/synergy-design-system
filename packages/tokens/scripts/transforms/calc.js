/**
 * @var supportedTypes List of supported token types we apply the calculation to
 * @type String[]
 */
const supportedTypes = [
  'borderRadius',
  'borderWidth',
  'dimension',
  'fontSizes',
  'letterSpacing',
  'lineHeights',
  'sizing',
  'spacing',
  'number',
];

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
 * List of supported 
 */
const supportedPrefixes = [
  'syn-spacing',
];

// --syn-spacing-small: calc(4px * 3); // yes
// --syn-input-spacing-small: calc(calc(4px * 3)); // no :()


/**
 * Custom transform used for adding calc() around variables that need it.
 * @see https://github.com/amzn/style-dictionary/issues/820
 */
export const calc = {
  matcher: ({ type, value, name }) => {
    if (!supportedTypes.includes(type)) return false;
    
    const hasSupportedPrefix = supportedPrefixes.some(prefix => name.startsWith(prefix));
    if (!hasSupportedPrefix) return false;

    return typeof value === 'string' && !!supportedCalculations.find((calcChar) => value.includes(calcChar));
  },
  name: 'syn/calc',
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

    console.log(output);

    return `calc(${output})`;
  },
  transitive: true,
  type: 'value',
};
