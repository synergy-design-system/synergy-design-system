import type { WebComponentsRenderer, Preview } from "@storybook/web-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '../../components/src/synergy';

import '../../tokens/src/shoelace-fallbacks/_utility.css';
import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation';
import { LIGHT_THEME, DARK_THEME } from './modes.ts';

const themeByClassName = withThemeByClassName<WebComponentsRenderer>({
  defaultTheme: LIGHT_THEME,
  parentSelector: 'body',
  themes: {
    [LIGHT_THEME]: 'syn-theme-light',
    [DARK_THEME]: 'syn-theme-dark',
  },
});

const preview: Preview = {
  decorators: [stopAnimation, themeByClassName],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    // Make sure we are able to check background colors when in our different themes
    backgrounds: {
      default: 'neutral-1000',
      values: [
        {
          name: 'neutral-1000',
          value: 'var(--syn-color-neutral-0)',
        },
        {
          name: 'neutral-50',
          value: 'var(--syn-color-neutral-50)',
        },
        {
          name: 'primary-100',
          value: 'var(--syn-color-primary-50)',
        },
      ],
    },
    chromatic: {
      disableSnapshot: true,
      // @see https://www.chromatic.com/docs/themes/
      modes: {
        [LIGHT_THEME]: {
          theme: LIGHT_THEME,
        },
        [DARK_THEME]: {
          theme: DARK_THEME,
        },
      },
    },
    controls: {
      disable: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      stories: { inline: false },
      toc: true,
      format: 'html'
    },
  },
};

export default preview;
