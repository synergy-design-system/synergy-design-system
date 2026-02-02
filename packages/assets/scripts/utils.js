/* eslint-disable complexity */

/**
 * Get the parts of the logo variant from the option string in the filename.
 * @param {string} basename The basename from figma api
 * @returns {string[]} The parts of the logo variant from the option string in the filename.
 */
export const getLogoVariantPartsFromOptionString = basename => basename
  .split(', ')
  .map(part => part.split('=').at(-1).trim().toLowerCase());

/**
 * Create a filename for the logo variant.
 * @param {string} variant The variant of the logo, e.g. "logo", "claim-below", "claim-right-top"
 * @param {string} color The color of the logo, e.g. "black", "blue", "white"
 * @param {string} theme The theme the logo is for, e.g. "sick2018", "sick2025"
 * @returns {string} The filename for the logo variant.
 */
export const createFileNameForLogo = (variant, color, theme) => {
  // Our original filenames did not include the theme name, so we have to match here
  let finalName = [
    'logo',
    variant,
    color,
  ].join('-');

  if (theme === 'sick2018') {
    if (variant === 'logo' && color === 'black') {
      finalName = 'logo-black';
    } else if (variant === 'logo' && color === 'blue') {
      finalName = 'logo-color';
    } else if (variant === 'logo' && color === 'white') {
      finalName = 'logo-white';
    } else if (variant === 'claim-below' && color === 'black') {
      finalName = 'logo-claim-black';
    } else if (variant === 'claim-below' && color === 'blue') {
      finalName = 'logo-claim-color';
    } else if (variant === 'claim-below' && color === 'white') {
      finalName = 'logo-claim-white';
    }
  }

  return `${finalName}.svg`;
};
