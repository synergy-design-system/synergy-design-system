import { removeSection, removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'select.component.ts',
  'select.styles.ts',
  'select.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = removeSections([
    ['/** Draws a pill-style', ';'],
    ['?pill', 'pill}'],
    ["'select--pill'", ','],
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
const transformStyles = (path, originalContent) => {
  // Remove the pill attribute
  const content = removeSections([
    ['/* Pills', '/* Prefix', {
      preserveEnd: true,
    }],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorSelect = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('select.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('select.styles.ts')) {
    return transformStyles(path, content);
  }

  console.log(`Todo: Write transforms for ${path}`);
  return output;
};
