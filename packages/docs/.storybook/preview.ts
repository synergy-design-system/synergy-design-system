import type { WebComponentsRenderer, Preview, StoryContext } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@synergy-design-system/tokens/themes/sick2025_dark.css';
import '@synergy-design-system/tokens/themes/sick2025_light.css';
import '@synergy-design-system/tokens/themes/sick2018_dark.css';
import '@synergy-design-system/tokens/themes/sick2018_light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '../../components/src/synergy';

import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation.js';
import {
  DARK_THEME,
  LIGHT_THEME,
  SICK_2025_DARK,
  SICK_2025_LIGHT,
} from './modes.js';
import { generateFigmaPluginObject } from '../src/helpers/figma.js';
import docsCodepenEnhancer from '../src/docs-codepen-enhancer/index.js';
import { storybookUtilities } from '../src/helpers/component.js';

const themeByClassName = withThemeByClassName<WebComponentsRenderer>({
  defaultTheme: LIGHT_THEME,
  parentSelector: 'body',
  themes: {
    [LIGHT_THEME]: 'syn-theme-light',
    [DARK_THEME]: 'syn-theme-dark',
    [SICK_2025_DARK]: 'syn-sick-2025-dark',
    [SICK_2025_LIGHT]: 'syn-sick-2025-light',
  },
});

const preview: Preview = {
  decorators: [stopAnimation, themeByClassName],
  parameters: {
    // Incompatible with storybook@8
    // actions: { argTypesRegex: "^on[A-Z].*" },
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
      diffThreshold: 0.50, // Original value is set to 0.63
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
    design: generateFigmaPluginObject('104-238'),
    docs: {
      stories: { inline: false },
      toc: {
        headingSelector: 'h2, h3',
      },
      source: {
        format: 'html', transform: (code: string, storyContext: StoryContext) => storybookUtilities.codeOptimizer(docsCodepenEnhancer(code, storyContext)),
      }
    },
    // Configures the viewports addon to make sure
    // that we have a valid default viewport.
    // When not setting this, the last active viewport will be used, which we do not want
    viewport: {
      defaultViewport: 'defaultViewPort',
      viewports: {
        ...MINIMAL_VIEWPORTS,
        defaultViewPort: {
          name: 'Default',
          styles: {
            width: '100%',
            height: '100%',
          },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;
