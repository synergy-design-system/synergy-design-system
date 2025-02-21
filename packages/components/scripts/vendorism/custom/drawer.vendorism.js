import { addSectionsAfter } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'drawer.component.ts',
  'drawer.styles.ts',
  'drawer.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // #782: Hide the active element when the alert is hidden
  const content = addSectionsAfter([
    [
      "import type { CSSResultGroup } from 'lit';",
      "import { blurActiveElement } from '../../internal/closeActiveElement.js';",
    ],
    [
      '// Hide',
      '      blurActiveElement(this);',
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => ({
  content: originalContent,
  path,
});

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTests = (path, originalContent) => ({
  content: originalContent,
  path,
});

export const vendorDrawer = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('drawer.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('drawer.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('drawer.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
