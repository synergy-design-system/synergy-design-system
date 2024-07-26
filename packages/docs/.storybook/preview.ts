import type { WebComponentsRenderer, Preview, StoryContext } from "@storybook/web-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '../../components/src/synergy';

declare const __VITE_PACKAGE_VERSIONS__: Record<string, string>;

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
          // We hijack the formatter to keep track of every story's code change and add a button to edit it on CodePen 
          const storiesOnDocsPage = document.querySelectorAll(`#anchor--${storyContext.id}`);

          // Unfortunately, the editable story in a docs page has the same ID as the first story.
          storiesOnDocsPage.forEach((story) => {
            const showCodeButton = story.querySelector('.docblock-code-toggle');
            if (showCodeButton) {
              const editCodeButton = showCodeButton.cloneNode(true);
              editCodeButton.textContent = 'Edit on CodePen';
              editCodeButton.classList.add('docblock-codepen-button');

              const isEditableStory = story.querySelector('.sb-bar');

              // We want to remove old buttons, but as described two stories share the same ID.
              // This leads to this little hack to make sure that always the correct button is visible for every story.
              //
              // Part 1: For the editable story (with '.sb-bar') remove all buttons except the last one
              //         as this could contain the correct button for the editable story
              if (isEditableStory) {
                story.querySelectorAll('.docblock-codepen-button:not(:last-of-type)').forEach((el) => {
                  el.remove();
                });
              }
              else {
                story.querySelectorAll('.docblock-codepen-button').forEach((el) => {
                  el.remove();
                });
              }

              // Add the button to the end
              showCodeButton.parentElement.appendChild(editCodeButton);

              // Part 2: Hide the last button, because the one before the last is the correct one for the editable story
              if (isEditableStory) {
                story.querySelectorAll('.docblock-codepen-button:not(:last-of-type)').forEach((el) => {
                  el.style.display = 'block';
                  el.style.borderRight = 'none';
                });
                story.querySelector('.docblock-codepen-button:last-of-type').style.display = 'none';
              }

              // Finally add the event listener to the button
              editCodeButton.addEventListener('click', () => {
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
                  css: `/* Import theme */
@import url("https://esm.sh/@synergy-design-system/tokens@${__VITE_PACKAGE_VERSIONS__['@synergy-design-system/tokens']}/dist/themes/light.css");

/* Import utilities */
@import url("https://esm.sh/@synergy-design-system/components@${__VITE_PACKAGE_VERSIONS__['@synergy-design-system/components']}/dist/styles/index.css");

/* Import styles */
@import url("https://esm.sh/@synergy-design-system/styles@${__VITE_PACKAGE_VERSIONS__['@synergy-design-system/styles']}/dist/index.css");`,
                  js: `import * as components from "https://esm.sh/@synergy-design-system/components@${__VITE_PACKAGE_VERSIONS__['@synergy-design-system/components']}/dist/synergy.js";

// Override to make icons work with CDN
const { registerIconLibrary } = components;

registerIconLibrary("default", {
  resolver: (name) =>
    \`https://esm.sh/@synergy-design-system/assets@${__VITE_PACKAGE_VERSIONS__['@synergy-design-system/assets']}/src/icons/\${name}.svg\`
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
