import { addSectionBefore } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'option.component.ts',
  'option.styles.ts',
  'option.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = addSectionBefore(
    originalContent,
    "customElements.whenDefined('syn-select').then(() => {",
    `customElements.whenDefined('syn-combobox').then(() => {
      const controller = this.closest('syn-combobox');
      if (controller) {
        controller.handleDefaultSlotChange();
      }
    });`,
    { tabsAfterInsertion: 2 },
  );

  return {
    content,
    path,
  };
};

export const vendorOption = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('option.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
