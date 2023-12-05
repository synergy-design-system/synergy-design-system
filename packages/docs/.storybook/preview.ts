import type { Preview } from "@storybook/web-components";
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '../../components/src/synergy';

import '../src/docs.css';
import '../../tokens/src/shoelace-fallbacks/_utility.css';

import { stopAnimation } from '../src/decorators/StopAnimation';

const preview: Preview = {
  decorators: [stopAnimation],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
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
