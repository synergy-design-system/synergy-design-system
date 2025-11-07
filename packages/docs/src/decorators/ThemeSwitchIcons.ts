import type { StoryContext, StoryFn } from '@storybook/web-components-vite';
import { DecoratorHelpers } from '@storybook/addon-themes';
import {
  type SynIcon,
  getBasePath,
  getIconMigrationName,
  registerIconLibrary,
  setSystemIconLibrary,
} from '@synergy-design-system/components';
import { type IconLibrary } from '../../../components/src/components/icon/library.js';
import {
  DARK_THEME, LIGHT_THEME, SICK_2025_DARK, SICK_2025_LIGHT,
} from '../../.storybook/modes.js';

/**
 * Recursively searches through a DOM context for syn-icon elements of library="system"
 *
 * This function performs a search through DOM nodes and their shadow roots
 * to locate all syn-icon elements that use the "system" library attribute.
 *
 * @param context - The DOM context to search through
 * @param foundIcons - Array to collect found syn-icon elements
 */
function searchForSystemIcons(context: Document | ShadowRoot | Element, foundIcons: SynIcon[]) {
  const icons = context.querySelectorAll('syn-icon[library="system"]');
  foundIcons.push(...Array.from(icons) as SynIcon[]);

  const elementsWithShadow = context.querySelectorAll('*');
  elementsWithShadow.forEach(element => {
    if (element.shadowRoot) {
      // Recursively search in Shadow DOM
      searchForSystemIcons(element.shadowRoot, foundIcons);
    }
  });
}

/**
 * Finds and refreshes all syn-icon elements with library="system" in the DOM
 */
function refreshSystemIcons() {
  const foundIcons: SynIcon[] = [];

  searchForSystemIcons(document, foundIcons);

  // Trigger a re-render of all found icons
  foundIcons.forEach(icon => icon.requestUpdate('name'));
}

/**
 * Storybook decorator that switches icon libraries based on the current theme.
 * Currently supported themes are sick2018 and sick2025
 *
 * The decorator performs the following actions:
 * 1. Determines the theme from the Storybook context
 * 2. Sets the appropriate system icon library
 * 3. Configures the 'default' icon library with the correct asset path
 * 4. Refreshes all existing system icons in the DOM to reflect the new library
 *
 * @param story - The Storybook story function to decorate
 * @param context - The Storybook story context containing theme information
 */
export const themeSwitchIcons = (story: StoryFn, context: StoryContext) => {
  const theme = DecoratorHelpers.pluckThemeFromContext(context);
  let themePath = '';
  let resolver: IconLibrary['resolver'];

  switch (theme) {
  case SICK_2025_DARK:
  case SICK_2025_LIGHT:
    setSystemIconLibrary('sick2025');
    themePath = 'assets/sick2025/outline/';
    resolver = (name: string) => getBasePath(`assets/sick2025/outline/${getIconMigrationName(name)}.svg`);
    break;
  case DARK_THEME:
  case LIGHT_THEME:
  default:
    setSystemIconLibrary('sick2018');
    themePath = 'assets/icons/';
    resolver = (name: string) => getBasePath(`${themePath}${name}.svg`);
    break;
  }

  const library: IconLibrary = {
    name: 'default',
    resolver,
  };
  registerIconLibrary('default', library);

  // Search for all system icons and refresh them.
  // This needs to be done in the next render cycle, as otherwise the icons are not yet available
  setTimeout(refreshSystemIcons);

  return story(context.args, context);
};
