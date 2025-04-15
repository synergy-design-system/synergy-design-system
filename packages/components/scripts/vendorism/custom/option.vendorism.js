import { removeSection } from '../remove-section.js';
import {
  addSectionsBefore,
  replaceSection,
  replaceSections,
} from '../replace-section.js';

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

  // #540: Support a custom delimiter
  content = addSectionsBefore([
    [
      'import type { CSSResultGroup }',
      "import { delimiterToWhiteSpace } from './utility.js';",
    ],
    [
      '@state() current',
      `// the delimiter used to separate multiple values in a select
  // This is provided by the wrapping syn-select
  @state() delimiter = ' ';`,
      {
        newlinesAfterInsertion: 2,
        tabsAfterInsertion: 1,
      },
    ],
  ], content);

  content = replaceSections([
    [
      "if (this.value.includes(' ')) {",
      `const { delimiter } = this;

    if (this.value.includes(delimiter)) {`,
    ],
    [
      'console.error(`Option values cannot include a space. All spaces have been replaced with underscores.`, this);',
      // eslint-disable-next-line no-template-curly-in-string
      'console.error(`Option values cannot include "${delimiter}". All occurrences of "${delimiter}" have been replaced with "_".`, this);',
    ],
    [
      "this.value = this.value.replace(/ /g, '_');",
      'this.value = delimiterToWhiteSpace(this.value, this.delimiter);',
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
