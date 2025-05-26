/* eslint-disable max-len */
import React, {
  useState,
} from 'react';

const images = import.meta.glob('../../../assets/src/component-thumbnails/*.svg', { eager: true });

export default { title: 'Component Overview' };

const imageMap = Object.entries(images).reduce((acc, [filePath, module]) => {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.svg'));
  acc[fileName] = module.default || module;
  return acc;
}, {} as Record<string, string>);

export const ComponentOverviewPage = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
    }}
  >
    {Object.entries(imageMap).map(([name, url]) => {
      const [isHovered, setIsHovered] = useState(false);

      return (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: `2px solid ${isHovered ? 'var(--syn-color-primary-300)' : 'var(--syn-color-neutral-100)'}`,
            borderRadius: '8px',
            padding: '12px',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(event)=> {
            window.top.location.href = `/?path=/docs/components-syn-${name}--docs`;
          }}
        >
        <h3 style={{
          flexShrink: 0,
          margin: 0,
          fontSize: '1rem',
          textAlign: 'center'
        }}>{name}</h3>
          <div >
            <img src={url} className="component"></img>
          </div>
        </div>
      );
    })}
  </div>
);

