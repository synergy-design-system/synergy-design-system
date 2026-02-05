import { DecoratorHelpers } from '@storybook/addon-themes';
import { StoryContext } from '@storybook/web-components-vite';
import {
  DARK_THEME, LIGHT_THEME, SICK_2018_DARK_CLASS,
  SICK_2018_LIGHT_CLASS, SICK_2025_DARK, SICK_2025_DARK_CLASS,
  SICK_2025_LIGHT, SICK_2025_LIGHT_CLASS,
} from '../../.storybook/modes.js';

// Create typed constants for CSS classes needed for typescript
const CLASSES = {
  SICK_2018_DARK: SICK_2018_DARK_CLASS as string,
  SICK_2018_LIGHT: SICK_2018_LIGHT_CLASS as string,
  SICK_2025_DARK: SICK_2025_DARK_CLASS as string,
  SICK_2025_LIGHT: SICK_2025_LIGHT_CLASS as string,
} as const;

export default function docsPreviewIframeThemer(storyContext: StoryContext) {
  // We need a timeout here, because otherwhise we become a flash of light-2018 to other themes
  setTimeout(() => {
    const theme = DecoratorHelpers.pluckThemeFromContext(storyContext);

    let themeClass = CLASSES.SICK_2018_LIGHT;

    switch (theme) {
      case SICK_2025_DARK:
        themeClass = CLASSES.SICK_2025_DARK;
        break;
      case SICK_2025_LIGHT:
        themeClass = CLASSES.SICK_2025_LIGHT;
        break;
      case DARK_THEME:
        themeClass = CLASSES.SICK_2018_DARK;
        break;
      case LIGHT_THEME:
      default:
        themeClass = CLASSES.SICK_2018_LIGHT;
        break;
    }

    const iframeStorys = document.querySelectorAll<HTMLIFrameElement>(`#iframe--${storyContext.id}`);
    // Unfortunately, the editable story in a docs page has the same ID as the first story.
    iframeStorys.forEach((story) => {
      const body = story.contentDocument?.body;
      if (!body) {
        return;
      }
      const bodyClassList = body.classList;
      bodyClassList?.toggle(CLASSES.SICK_2018_DARK, themeClass === CLASSES.SICK_2018_DARK);
      bodyClassList?.toggle(CLASSES.SICK_2018_LIGHT, themeClass === CLASSES.SICK_2018_LIGHT);
      bodyClassList?.toggle(CLASSES.SICK_2025_DARK, themeClass === CLASSES.SICK_2025_DARK);
      bodyClassList?.toggle(CLASSES.SICK_2025_LIGHT, themeClass === CLASSES.SICK_2025_LIGHT);
    });
  }, 500);
}
