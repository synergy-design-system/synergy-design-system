import { defaultIcons as brand2018Icons } from './default-icons.js';
import { defaultIcons as brand2025Icons } from './default-icons-2025.js';

export { createSpriteSheet } from './createSpritesheet.js';
export {
  brand2025Icons,
  brand2018Icons,
  // Fallback for the defaultIcons export.
  // @todo: When creating the next major version, make this point to brand2025Icons.
  brand2018Icons as defaultIcons,
};

export type * from './createSpritesheet.js';

export default brand2018Icons;
