import type { Preview } from '@storybook/html';
import '@sick-design-system/css/default.css';
import { provideSDSDesignSystem } from '../src/system';

provideSDSDesignSystem();

const preview: Preview = {
  parameters: {
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
