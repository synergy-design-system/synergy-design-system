import type { WebComponentsRenderer, Preview } from "@storybook/web-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '../../components/src/synergy';

import '../../tokens/src/shoelace-fallbacks/_utility.css';
import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation';

const themeByClassName = withThemeByClassName<WebComponentsRenderer>({
  defaultTheme: '🌞 Synergy (light)',
  themes: {
    '🌞 Synergy (light)': 'syn-theme-light',
    '🌙 Synergy (dark)': 'syn-theme-dark',
  },
  parentSelector: 'body',
});

const preview: Preview = {
  decorators: [stopAnimation, themeByClassName],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    // Make sure we are able to check background colors when in our different themes
    backgrounds: {
      default: 'white',
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
      disableSnapshot: true
    },
    controls: {
      disable: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      stories: { inline: false }
    },
    themes: {
      default: 'Synergy (light)',
      list: [
        { name: 'Synergy (light)', class: 'syn-theme-light', color: '#36bbfa' },
        { name: 'Synergy (dark)', class: 'syn-theme-dark', color: '#072E4A' },
      ],
    },
  },
};

export default preview;
