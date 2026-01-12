import { defaultIcons as sick2018Icons } from './sick2018/js/index.js';
import { filledIcons as sick2025FilledIcons } from './sick2025/js/filled.js';
import { outlineIcons as sick2025OutlineIcons } from './sick2025/js/outline.js';

const sick2025Icons = {
  ...sick2025FilledIcons,
  ...sick2025OutlineIcons,
};

export { createSpriteSheet } from './createSpritesheet.js';
export {
  sick2025Icons,
  sick2025FilledIcons,
  sick2025OutlineIcons,
  sick2018Icons,
  sick2025Icons as defaultIcons,
};

export type * from './createSpritesheet.js';

export default sick2025Icons;
