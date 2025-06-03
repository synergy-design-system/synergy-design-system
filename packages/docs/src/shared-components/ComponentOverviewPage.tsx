/* eslint-disable max-len */
// @ts-expect-error virtual is valid
import componentsManifest from 'virtual:vite-plugin-cem/custom-elements-manifest';
// @ts-expect-error virtual is valid
import stylesManifest from 'virtual:vite-plugin-synergy-styles/custom-elements-manifest';
import type { Module } from 'custom-elements-manifest/schema.d.ts';
import React, {
  useState,
} from 'react';

import { kebabCase, pascalCase } from 'change-case';

const images = import.meta.glob('../../../assets/src/component-thumbnails/*', { eager: true });

export default { title: 'Component Overview' };

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

const imageMap = Object.entries(images).reduce((acc, [filePath, module]) => {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.svg'));
  acc[fileName] = ((module as { default?: string }).default || module) as string;
  return acc;
}, {} as Record<string, string>);

export const ComponentOverviewPage = () => (
  <div
    style={{
      display: 'grid',
      gap: 'var(--syn-spacing-medium)',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    }}
  >
    {Object.entries(imageMap).map(([name, url]) => {
      const [isHovered, setIsHovered] = useState(false);

      return (
        <a
          key={name}
          style={{
            border: `var(--syn-border-width-medium) solid ${isHovered ? 'var(--syn-link-color-hover)' : 'var(--syn-color-neutral-100)'}`,
            borderRadius: 'var(--syn-border-radius-medium)',
            cursor: 'pointer',
          }}
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={getUrl(name)}
        >
          <figure style={{
            margin: 0,
            textAlign: 'center',
          }}>
            <figcaption style={{ padding: 'var(--syn-spacing-small) 0' }}>{name}</figcaption>
            <img src={url} alt={name} className="component"></img>
          </figure>
        </a>
      );
    })}
  </div>
);
