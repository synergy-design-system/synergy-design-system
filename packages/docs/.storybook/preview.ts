import type { Preview } from '@storybook/html';
import '@sick-design-system/css/default.css';
import { quickStart } from '@sick-design-system/components';
import * as tokens from '@sick-design-system/design-tokens';

quickStart();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    badgesConfig: {
      needsHandoff: {
        styles: {
          backgroundColor: tokens.sdsColorAccent500,
          borderColor: tokens.sdsColorAccent600,
          color: tokens.sdsColorNeutral0,
        },
        title: 'Needs handoff',
      },
      v1: {
        styles: {
          backgroundColor: tokens.sdsColorPrimary500,
          borderColor: tokens.sdsColorNeutral800,
          color: tokens.sdsColorNeutral0,
        },
        title: 'v1.0.0'
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
