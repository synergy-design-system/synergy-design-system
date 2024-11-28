import { removeSections } from '../remove-section.js';

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
  const contentWithRemovedStyles = removeSections([
    ['/** Draws a filled', 'filled = false;'],
    ["'select--filled", ','],
    ['/** Draws a pill-style', ';'],
    ['?pill', 'pill}'],
    ["'select--pill'", ','],
  ], originalContent);

  // Quickfix, needed until shoelace updates the select components whenDefined selector
  const content = contentWithRemovedStyles.replaceAll(
    'wa-option',
    'syn-option',
  );

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
    ['/* Filled selects', '/*', {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
    ['/* Pills', '/* Prefix', {
      preserveEnd: true,
    }],
  ], originalContent);

  return {
    content,
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
  const content = removeSections([
    ["it('should have rounded tags", '});'],
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

  if (path.endsWith('select.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
