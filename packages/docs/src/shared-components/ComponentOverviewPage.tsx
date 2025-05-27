/* eslint-disable max-len */
import React, {
  useState,
} from 'react';

const images = import.meta.glob('../../../assets/src/component-thumbnails/*.svg', { eager: true });

export default { title: 'Component Overview' };

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
            border: `var(--syn-border-width-medium) solid ${isHovered ? 'var(--syn-color-primary-300)' : 'var(--syn-color-neutral-100)'}`,
            borderRadius: 'var(--syn-border-radius-medium)',
            cursor: 'pointer',
          }}
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={`/?path=/docs/components-syn-${name}--docs`}
        >
          <figure style={{
            margin: 0,
            textAlign: 'center',
          }}>
            <figcaption style={{ padding: 'var(--syn-spacing-small) 0' }}>{name}</figcaption>
            <img src={url} className="component"></img>
          </figure>
        </a>
      );
    })}
  </div>
);
