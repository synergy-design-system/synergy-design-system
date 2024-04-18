/* eslint-disable @typescript-eslint/quotes */
import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'spinner.styles.ts',
];

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove the default spin animation
    ['@keyframes spin', '`;', {
      additionalNewlines: 1,
      preserveEnd: true,
    }],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorSpinner = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('spinner.styles.ts')) {
    return transformStyles(path, content);
  }

  return output;
};
