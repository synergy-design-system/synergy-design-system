import { removeSection } from '../remove-section.js';
import { addSectionsBefore, replaceSection } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'option.component.ts',
  'option.styles.ts',
  'option.test.ts',
];

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTests = (path, originalContent) => {
  // #805: Allow numeric value property for syn-option
  const content = removeSection(
    originalContent,
    "it('should convert non-string values to string",
    `expect(el.value).to.equal('10');
  });
`,
    { additionalNewlines: 1 },
  );
  return {
    content,
    path,
  };
};

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = addSectionsBefore([
    // Add "handleDefaultSlotChange" trigger for syn-combobox
    [
      "customElements.whenDefined('syn-select').then(() => {",
      `customElements.whenDefined('syn-combobox').then(() => {
        const controller = this.closest('syn-combobox');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });`,
      { tabsAfterInsertion: 3 },
    ],
  ], originalContent);

  // #805: Allow numeric value property for syn-option
  content = replaceSection([
    "value = '';",
    "value: string | number = '';",
  ], content);

  content = addSectionsBefore([
    [
      '// Ensure the value is a string.',
      `if (typeof this.value === 'number') {
      return;
    }`,
      { newlinesAfterInsertion: 2, tabsAfterInsertion: 2 },
    ],
  ], content);

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

  if (path.endsWith('option.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
