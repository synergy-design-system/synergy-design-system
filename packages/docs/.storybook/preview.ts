import type { WebComponentsRenderer, Preview, StoryContext } from "@storybook/web-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '../../components/src/synergy';

import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation.js';
import { LIGHT_THEME, DARK_THEME } from './modes.js';
import { generateFigmaPluginObject } from "../src/helpers/figma.js";

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
        format: 'html', transform: (code: string, storyContext: StoryContext) => {
          const id = 'story--' + storyContext.id;
          const storiesOnDocsPage = document.querySelectorAll(`#${id}, #${id}--primary`);
          storiesOnDocsPage.forEach((element) => {
            const button = element.closest('.docs-story').querySelector('.docblock-code-toggle');
            if (button) {
              element.closest('.docs-story').querySelectorAll('.docblock-codepen-button').forEach((el) => {
                el.remove();
              });

              const newButton = button.cloneNode(true);
              newButton.textContent = 'Edit on CodePen';
              newButton.classList.add('docblock-codepen-button');
              button.parentElement.appendChild(newButton);
              newButton.addEventListener('click', () => {
                const form = document.createElement('form');
                form.action = 'https://codepen.io/pen/define';
                form.method = 'POST';
                form.target = '_blank';

                // Docs: https://blog.codepen.io/documentation/prefill/
                const data = {
                  title: '',
                  description: '',
                  tags: ['synergy-design-system', 'web components'],
                  editors: 1110,
                  head: `<meta name="viewport" content="width=device-width">`,
                  css_external: ``,
                  js_external: ``,
                  js_module: true,
                  js_pre_processor: 'none',
                  html: code,
                  css: '@import url("https://esm.sh/@synergy-design-system/tokens/dist/themes/light.css");',
                  js: `import * as components from "https://esm.sh/@synergy-design-system/components/dist/synergy.js";

// Override defaultLibrary to make it work with the CDN
const { registerIconLibrary } = components;

registerIconLibrary("default", {
  resolver: (name) =>
    \`https://esm.sh/@synergy-design-system/assets@1.6.0/src/icons/\${name}.svg\`
});`
                };

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'data';
                input.value = JSON.stringify(data);
                form.append(input);

                document.documentElement.append(form);
                form.submit();
                form.remove();
              });
            }
          });
          return code;
        }
      },
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

export default preview;;
