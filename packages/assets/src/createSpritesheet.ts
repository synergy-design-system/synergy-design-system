import { defaultIcons as brand2018Icons } from './default-icons.js';
import { defaultIcons as brand2025Icons } from './default-icons-2025.js';

export type Icon2018Keys = keyof typeof brand2018Icons;
export type Icon2025Keys = keyof typeof brand2025Icons;
export type AllowedIconkeys = Icon2018Keys | Icon2025Keys;
export type AllowedIconsets = 'brand2018' | 'brand2025';

/**
 * Creates a SVG sprite sheet with the given icons.
 * @param icons The icon keys to use
 * @param iconset The icon set to use, either 'brand2018' or 'brand2025'. Defaults to 'brand2018'.
 * @returns String representation of the SVG sprite sheet
 */
export function createSpriteSheet(
  icons: Icon2018Keys[],
  iconset?: 'brand2018'
): string;
export function createSpriteSheet(
  icons: Icon2025Keys[],
  iconset: 'brand2025'
): string;
export function createSpriteSheet(
  icons: (Icon2018Keys | Icon2025Keys)[],
  iconset: AllowedIconsets = 'brand2018',
) {
  const setToUse = iconset === 'brand2025' ? brand2025Icons : brand2018Icons;
  const foundIcons = Object
    .entries(setToUse)
    .filter(([key]) => icons.includes(key as AllowedIconkeys));

  const symbols = foundIcons
    // Make sure to sort the icons by key always.
    // This may prevent problems when saving the sheet in the filesystem
    // and new items are added to the icons object.
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => value
      .replace('<svg', `<symbol id="${key}"`)
      .replace('</svg>', '</symbol>'));

  return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${symbols.join('\n\t')}
</svg>
  `.trim();
}
