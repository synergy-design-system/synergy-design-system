/* eslint-disable @typescript-eslint/quotes */
import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'spinner.component.ts',
  'spinner.styles.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = removeSections([
    // Remove the track color property
    ['* @cssproperty --track-color', '.'],
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
  const content = removeSections([
    // Remove the default spin animation
    ['@keyframes spin', '`;', {
      additionalNewlines: 1,
      preserveEnd: true,
    }],
    // Remove the track color
    ['--track-color:', ');'],
    ['stroke: var(--track-color)', ';'],
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

  if (path.endsWith('spinner.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('spinner.styles.ts')) {
    return transformStyles(path, content);
  }

  return output;
};
