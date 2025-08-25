const FILES_TO_TRANSFORM = [
  'menu-label.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = originalContent
    // Add the import for divider
    .replace(
      "import { html } from 'lit';",
      `
import { html } from 'lit';
import SynDivider from '../divider/divider.component.js';
      `.trim(),
    )
    // /Import for divider

    // Add dependency list
    .replace(
      'render()',
      `static dependencies = {
    'syn-divider': SynDivider,
  };
    
  render()
      `.trimEnd(),
    )
    // /Add dependency list

    // Add the divider to the template
    .replace(
      'return html` <slot part="base" class="menu-label"></slot> `;',
      `return html\`
      <div part="base" class="menu-label-wrapper">
        <syn-divider class="menu-label__divider" part="divider"></syn-divider>
        <slot part="label" class="menu-label"></slot>
      </div>
    \`;
      `.trimEnd(),
    )
    // /Add the divider to the template
  return {
    content,
    path,
  };
};

export const vendorMenuLabel = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('menu-label.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
