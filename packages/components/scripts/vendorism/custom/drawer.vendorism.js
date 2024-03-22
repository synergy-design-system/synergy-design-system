import { removeSections } from '../remove-section.js';

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
  return {
    content: originalContent,
    path,
  };
};

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  return {
    content: originalContent,
    path,
  };
};

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTests = (path, originalContent) => {
  return {
    content: originalContent,
    path,
  };
};

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
