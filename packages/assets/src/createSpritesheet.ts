import { defaultIcons } from './default-icons.js';

type IconKeys = keyof typeof defaultIcons;

/**
 * Creates a SVG sprite sheet with the given icons.
 * @param icons The icon keys to use
 * @returns String representation of the SVG sprite sheet
 */
export const createSpriteSheet = (icons: IconKeys[]) => {
  const foundIcons = Object
    .entries(defaultIcons)
    .filter(([key]) => icons.includes(key as IconKeys));

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
};
