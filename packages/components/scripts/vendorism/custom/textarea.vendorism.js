import { removeSection } from '../remove-section.js';
import { replaceSection, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'textarea.component.ts',
  'textarea.styles.ts',
  'textarea.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = removeSection(originalContent, '/** Draws a filled', 'filled = false;');
  content = replaceSection(['filled', 'readonly'], content);

  content = replaceSections([
    ['filled', 'readonly'],
    // Make sure we don't unobserve an undefined element
    // @todo: Remove when shoelace ships this fix
    ['this.resizeObserver.unobserve(this.input);', `
    if (this.input) {
      this.resizeObserver.unobserve(this.input);
    }
    `.trim()],
  ], content);

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
  const content = replaceSections([
    ['Filled', 'Readonly'],
    ['filled', 'readonly'],
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
  const content = replaceSection(['filled', 'readonly'], originalContent);
  return {
    content,
    path,
  };
};

export const vendorTextarea = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('textarea.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('textarea.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('textarea.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
