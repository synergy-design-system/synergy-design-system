import { getTokensByCategory, sortTokens } from './tokens.js';

/**
 * Get all colors from a palette as object
 * @param palette The palette to search for
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete color palette
 */
export const getColorAsPalette = (palette: string, useFullTokenName = false) => Object.fromEntries(getTokensByCategory(`color${palette}`, useFullTokenName)
  .sort((a, b) => sortTokens(a, b, { replaceString: `syncolor${palette}` })));

/**
 * Get all palette members between a given weight
 * @param palette The palette to use.
 * @param minValue The minimal value. Defaults to 0
 * @param maxValue The maximal value. Defaults to Infinity
 * @returns Parts of the palette
 */
const getPaletteMembersByWeight = (
  palette: string,
  minValue = 0,
  maxValue = Infinity,
) => Object.fromEntries(
  Object
    .entries(getColorAsPalette(palette))
    .filter(([token]) => {
      const weight = parseInt(token.toLowerCase().replaceAll(palette, '').trim(), 10);
      return weight >= minValue && weight <= maxValue;
    }),
);

/**
 * Get the primary color palette
 */
export const getPrimaryColorPalette = (useFullTokenName = false) => getColorAsPalette('primary', useFullTokenName);

export const getAccentColorPalette = (useFullTokenName = false) => getColorAsPalette('accent', useFullTokenName);

/**
 * Get the full neutral palette
 */
export const getNeutralColorPalette = (useFullTokenName = false) => getColorAsPalette('neutral', useFullTokenName);

/**
 * Get the dark part of the neutral palette.
 * Dark is defined as a weight >= 500
 */
export const getNeutralDarkPalette = () => getPaletteMembersByWeight('neutral', 500);

/**
 * Get the mid part of the neutral palette.
 * mid is defined as a weight >= 200 and <= 499
 */
export const getNeutralMidPalette = () => getPaletteMembersByWeight('neutral', 200, 499);

/**
 * Get the light part of the neutral palette.
 * mid is defined as a weight <= 199
 */
export const getNeutralLightPalette = () => getPaletteMembersByWeight('neutral', 0, 199);
