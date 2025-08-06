import { defaultIcons as sick2018Icons } from './default-icons.js';
import { defaultIcons as sick2025Icons } from './default-icons-2025.js';

export { createSpriteSheet } from './createSpritesheet.js';
export {
  sick2025Icons,
  sick2018Icons,
  // Fallback for the defaultIcons export.
  // @todo: When creating the next major version, make this point to sick2025Icons.
  sick2018Icons as defaultIcons,
};

export type * from './createSpritesheet.js';

export default sick2018Icons;
