import type { Preview } from "@storybook/web-components";
import '@synergy-design-system/tokens/themes/light.css';

import { setCustomElementsManifest } from '@storybook/web-components';
import '../src/docs.css';
import '../../tokens/src/shoelace-fallbacks/_utility.css';

const preview: Preview = {
  parameters: {
    docs: {
      stories: { inline: false }
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
