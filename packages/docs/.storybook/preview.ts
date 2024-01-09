import type { WebComponentsRenderer, Preview } from "@storybook/web-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/tokens/themes/dark.css';
import '../../components/src/synergy';

import '../src/docs.css';
import '../../tokens/src/shoelace-fallbacks/_utility.css';

import { stopAnimation } from '../src/decorators/StopAnimation';

const themeByClassName = withThemeByClassName<WebComponentsRenderer>({
  defaultTheme: 'light',
  themes: {
    dark: 'syn-theme-dark',
    light: 'syn-theme-light',
  },
  parentSelector: 'body',
});

const preview: Preview = {
  decorators: [stopAnimation, themeByClassName],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
