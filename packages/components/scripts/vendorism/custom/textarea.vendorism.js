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

  content = replaceSections([
    ['filled', 'readonly'],
    // #783 Allow to see the title attribute in the checkbox
    [
      "@property() title = '';",
      "@property({ reflect: true }) title = '';",
    ],
  ], content);

  // #1023 Add fix for autocorrect to make it work as in the HTML spec for ts 5.9.3
  content = content.replace(
    '@property() autocorrect: string;',
    `@property({
    attribute: 'autocorrect',
    reflect: true,
    converter: {
      fromAttribute: (value: string) => value === '' || value === 'on',
      toAttribute: (value: boolean) => (value ? 'on' : 'off')
    },
    type: Boolean,
  }) autocorrect: boolean;`,
  );

  content = content.replace(
    "autocorrect=${ifDefined(this.autocorrect)}",
    "autocorrect=${ifDefined(this.autocorrect ? undefined : 'off')}"
  );
  // #1023

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
