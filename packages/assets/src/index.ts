import { defaultIcons as sick2018Icons } from './sick2018/js/index.js';
import sick2025Icons, {
  sick2025FilledIcons,
  sick2025OutlineIcons,
} from './sick2025/js/index.js';

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
