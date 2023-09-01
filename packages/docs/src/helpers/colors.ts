import * as tokens from '@sick-design-system/design-tokens';

/**
 * Get all colors from a palette as object
 * @param palette The palette to search for
 * @returns Returns the complete color palette
 */
const getColorAsPalette = (palette: string) => Object.fromEntries(
  Object.entries(tokens)
    .filter(([token]) => token.toLowerCase().startsWith(`sdscolor${palette}`))
    .map(([token, value]) => [
      token.toLowerCase().replace('sdscolor', ''),
      value,
    ]),
);

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
      const weight = parseInt(token.toLowerCase().replace(palette, '').trim(), 10);
      return weight >= minValue && weight <= maxValue;
    }),
);

/**
 * Get the primary color palette
 */
export const getPrimaryColorPalette = () => getColorAsPalette('primary');

export const getSecondaryColorPalette = () => getColorAsPalette('secondary');

export const getAccentColorPalette = () => getColorAsPalette('accent');

/**
 * Special case handling: As addons does not use the weight specifier but is still named,
 * we have to strip the naming by ourselfs
 */
export const getAddonsColorPalette = () => Object.fromEntries(
  Object
    .entries(getColorAsPalette('addons'))
    .map(([token, value]) => [
      token.replace('addons', ''),
      value,
    ]),
);

/**
 * Get the full neutral palette
 */
export const getNeutralColorPalette = () => getColorAsPalette('neutral');

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
