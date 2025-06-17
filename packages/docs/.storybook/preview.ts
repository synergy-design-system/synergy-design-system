import type { ClassDeclaration, ClassMember, Package } from 'custom-elements-manifest/schema.d.ts';
import type { WebComponentsRenderer, Preview, StoryContext } from '@storybook/web-components-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { setStorybookHelpersConfig } from '@wc-toolkit/storybook-helpers';

// @ts-expect-error This is a virtual import, which is not recognized by TypeScript
import componentsManifest from 'virtual:vite-plugin-cem/custom-elements-manifest';
// @ts-expect-error This is a virtual import, which is not recognized by TypeScript
import stylesManifest from 'virtual:vite-plugin-synergy-styles/custom-elements-manifest';

import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '../src/docs.css';

import { stopAnimation } from '../src/decorators/StopAnimation.js';
import { LIGHT_THEME, DARK_THEME } from './modes.js';
import { generateFigmaPluginObject } from '../src/helpers/figma.js';
import docsCodepenEnhancer from '../src/docs-codepen-enhancer/index.js';

// Filter out all private members and readonly properties from the manifest
const filteredManifest = (manifest: Package): Package => ({
  ...manifest,
  modules: manifest.modules.map((module) => ({
    ...module,
    declarations: (module.declarations as ClassDeclaration[])?.map((declaration) => ({
      ...declaration,
      members: (declaration.members as ClassMember[]).filter(
        (member: ClassMember) => member.description && member.privacy !== 'private',
      ),
    })),
  })),
});
const componentsManifestFiltered = filteredManifest(componentsManifest as Package);
const stylesManifestFiltered = filteredManifest(stylesManifest as Package);

// Copy the styles manifest into the components manifest
const manifest = {
  ...componentsManifestFiltered,
  modules: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...componentsManifestFiltered.modules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...stylesManifestFiltered.modules,
  ],
} as Package;

setCustomElementsManifest(manifest);

setStorybookHelpersConfig({
  hideArgRef: true,
  renderDefaultValues: false,
});

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
  initialGlobals: {
    background: {
      value: 'neutral-50',
    },
    viewport: { value: 'defaultViewPort', isRotated: false },
  },
  parameters: {
    backgrounds: {
      options: {
        'neutral-0': { name: 'neutral-0', value: 'var(--syn-color-neutral-0)' },
        'neutral-50': { name: 'neutral-50', value: 'var(--syn-color-neutral-50)' },
        'primary-50': { name: 'primary-50', value: 'var(--syn-color-primary-50)' },
      },
    },
    chromatic: {
      diffThreshold: 0.01, // Original value is set to 0.63
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
      expanded: true,
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
        format: 'html',
        transform: async (source: string, storyContext: StoryContext) => {
          const prettier = await import('prettier/standalone');
          const htmlParser = await import('prettier/parser-html');
          const resultWithCodepen = docsCodepenEnhancer(source, storyContext);
          try {
            return prettier.format(resultWithCodepen, {
              parser: 'html',
              plugins: [htmlParser],
            });
          } catch (e) {
            console.error(e);
            return resultWithCodepen;
          }
        }
      }
    },
    // Configures the viewports addon to make sure
    // that we have a valid default viewport.
    // When not setting this, the last active viewport will be used, which we do not want
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        defaultViewPort: {
          name: 'Default',
          styles: {
            width: '100%',
            height: '100%',
          },
          type: 'desktop',
        },
      }
    },
  },
  tags: ['autodocs']
};

export default preview;
