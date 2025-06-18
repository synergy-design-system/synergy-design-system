import {
  replaceSections,
} from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'radio-group.component.ts',
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
      "@property({ reflect: true }) value = '';",
      "@property({ reflect: true }) value: string | number = '';",
    ],
    [
      'this.defaultValue = this.value;',
      "this.defaultValue = typeof this.value === 'number' ? this.value.toString() : this.value;",
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorRadioGroup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('radio-group.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
