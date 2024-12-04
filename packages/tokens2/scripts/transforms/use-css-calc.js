/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @var supportedTypes List of supported token types we apply the calculation to
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
 * @var List of supported prefixes
 * @type String[]
 */
const supportedPrefixes = [
  'syn-spacing',
];

/**
 * Add support for fallback fonts to the font-family tokens
 * @type import('style-dictionary/types').ValueTransform addFallbackFonts
 */
export const useCssCalc = {
  filter: token => {
    const { type, value, name } = token;

    switch (true) {
    // Type could not be detected or is not supported
    case !type || !supportedTypes.includes(type): return false;

    // Make sure we have at least one supported prefix
    case !supportedPrefixes.some(prefix => name.startsWith(prefix)): return false;

    // Value is not a string
    case typeof value !== 'string': return false;

    // Value does not contain any supported calculation
    // default: return !!supportedCalculations.find((calcChar) => value.includes(calcChar));
    default: return !!supportedCalculations.find((calcChar) => value.includes(calcChar));
    }
  },
  name: 'syn/use-css-calc',
  /**
   * @returns {unknown}
   */
  transform: token => {
    // CSS Calc syntax needs a whitespace before AND after the calculation because:
    //   calc(4px * 3); <-- valid
    //   calc(4px *3);  <-- invalid
    const output = token.value
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
