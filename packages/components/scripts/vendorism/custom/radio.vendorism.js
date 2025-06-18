import {
  replaceSections,
} from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'radio.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = replaceSections([
    // #898: Allow string or number for value
    [
      '@property() value: string;',
      '@property() value: string | number;',
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorRadio = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('radio.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
