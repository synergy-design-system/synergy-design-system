import { defaultIcons as sick2018Icons } from './default-icons.js';
import { defaultIcons as sick2025Icons } from './default-icons-2025.js';

export type Icon2018Keys = keyof typeof sick2018Icons;
export type Icon2025Keys = keyof typeof sick2025Icons;
export type AllowedIconkeys = Icon2018Keys | Icon2025Keys;
export type AllowedIconsets = 'sick2018' | 'sick2025';

/**
 * Creates a SVG sprite sheet with the given icons.
 * @param icons The icon keys to use
 * @param iconset The icon set to use, either 'sick2018' or 'sick2025'. Defaults to 'sick2018'.
 * @returns String representation of the SVG sprite sheet
 */
export function createSpriteSheet(
  icons: Icon2018Keys[],
  iconset?: 'sick2018',
): string;
export function createSpriteSheet(
  icons: Icon2025Keys[],
  iconset: 'sick2025',
): string;
export function createSpriteSheet(
  icons: (Icon2018Keys | Icon2025Keys)[],
  iconset: AllowedIconsets = 'sick2018',
) {
  const setToUse = iconset === 'sick2025' ? sick2025Icons : sick2018Icons;
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
