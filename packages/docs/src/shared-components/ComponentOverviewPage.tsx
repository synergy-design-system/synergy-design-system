// @ts-expect-error virtual is valid
import componentsManifest from 'virtual:vite-plugin-cem/custom-elements-manifest';
// @ts-expect-error virtual is valid
import stylesManifest from 'virtual:vite-plugin-synergy-styles/custom-elements-manifest';
import type { Module } from 'custom-elements-manifest/schema.d.ts';
import React from 'react';

import { kebabCase, pascalCase } from 'change-case';
import { registerIconLibrary } from '../../../components/src/utilities/icon-library.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/icon/icon.js';
import { sick2025OutlineIcons } from '../../../assets/dist/index.js';

registerIconLibrary('default', {
  mutator: svg => svg.setAttribute('fill', 'currentColor'),
  resolver: (name) => {
    if (name in sick2025OutlineIcons) {
      const defaultName = name as keyof typeof sick2025OutlineIcons;
      return `data:image/svg+xml,${encodeURIComponent(sick2025OutlineIcons[defaultName])}`;
    }
    return '';
  },
});

const images = import.meta.glob('../../../assets/src/component-thumbnails/*.png', { eager: true });

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const componentNames = (componentsManifest.modules as Module[]).map((module) => module.declarations![0].name);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const styleNames = (stylesManifest!.modules as Module[]).map((module) => module.declarations![0].name);

function getUrl(name: string): string {
  const component = componentNames.find((componentName) => componentName === `Syn${pascalCase(name)}`);
  if (component) {
    return `/?path=/docs/components-syn-${name.replace(' ', '-').toLowerCase()}--docs`;
  }
  const styles = styleNames.find((componentName) => componentName === `syn-${kebabCase(name)}`);
  if (styles) {
    return `/?path=/docs/styles-syn-${name.replace(' ', '-').toLowerCase()}--docs`;
  }

  // eslint-disable-next-line no-console
  console.warn(`No URL found for component or style: ${name}`);

  return '#';
}

const imageMap = Object
  .entries(images)
  .reduce((acc, [filePath, module]) => {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.png'));
    acc[fileName] = ((module as { default?: string }).default || module) as string;
    return acc;
  }, {} as Record<string, string>);

export const ComponentOverviewPage = () => (
  <div className="syn-doc-component-overview">
    <style>{`
      .syn-doc-component-overview {
        display: grid;
        gap: var(--syn-spacing-2x-large);
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      .syn-doc-component-overview syn-card {
        &::part(body) {
          padding: 0;
        }

        &::part(footer) {
          padding: 0;
        }
        
        syn-button {
          --syn-button-border-radius-medium: 0 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium);

          width: 100%;
          &::part(label) {
            width: 100%;
          }
        }
      }
    `}</style>

    {Object.entries(imageMap).map(([name, url]) => (
      <syn-card shadow key={name}>
        <a
          href={getUrl(name)}
          slot="image"
        >
          <img
            alt={name}
            src={url}
          />
        </a>
        <syn-button
          href={getUrl(name)}
          slot="footer"
          variant="filled"
          size="medium"
        >
          <span style={{ textTransform: 'capitalize' }}>
            {name}
          </span>
          <syn-icon name="arrow_forward" slot="suffix" />
        </syn-button>
      </syn-card>
    ))}
  </div>
);
