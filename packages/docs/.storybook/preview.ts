import type { WebComponentsRenderer, Preview, StoryContext } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@synergy-design-system/tokens/themes/brand25-dark.css';
import '@synergy-design-system/tokens/themes/brand25-light.css';
import '@synergy-design-system/tokens/default-dark.css';
import '@synergy-design-system/tokens/default.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '../../components/src/synergy';

// Enable this to set default settings for all components
// import { setDefaultSettingsForElement, enableExperimentalSettingEmitEvents } from '../../components/src/synergy';
// enableExperimentalSettingEmitEvents();
// window.addEventListener('syn-default-settings-changed', console.log);
// setDefaultSettingsForElement('SynAccordion', {
//   size: 'small',
// });

import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation.js';
import {
  SICK_DARK_THEME,
  SICK_LIGHT_THEME,
  SYNERGY_DARK_THEME,
  SYNERGY_LIGHT_THEME,
} from './modes.js';
import { generateFigmaPluginObject } from '../src/helpers/figma.js';
import docsCodepenEnhancer from '../src/docs-codepen-enhancer/index.js';
import { storybookUtilities } from '../src/helpers/component.js';

const themeByClassName = withThemeByClassName<WebComponentsRenderer>({
  defaultTheme: SYNERGY_LIGHT_THEME,
  parentSelector: 'body',
  themes: {
    [SICK_DARK_THEME]: 'syn-theme-brand25-dark',
    [SICK_LIGHT_THEME]: 'syn-theme-brand25-light',
    [SYNERGY_LIGHT_THEME]: 'syn-theme-light',
    [SYNERGY_DARK_THEME]: 'syn-theme-dark',
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
        [SYNERGY_LIGHT_THEME]: {
          theme: SYNERGY_LIGHT_THEME,
        },
        [SYNERGY_DARK_THEME]: {
          theme: SYNERGY_DARK_THEME,
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
