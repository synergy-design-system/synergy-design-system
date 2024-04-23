import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'alert.styles.ts',
];

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove all variant styles as they do not apply anymore
    ['.alert--primary', '.alert__message {', {
      preserveEnd: true,
      removePrecedingWhitespace: false,
    }],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorAlert = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('alert.styles.ts')) {
    return transformStyles(path, content);
  }

  return output;
};
