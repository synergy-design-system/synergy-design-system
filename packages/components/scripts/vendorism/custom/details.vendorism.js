import { removeSections } from '../remove-section.js';
import { addSectionAfter, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'details.component.ts',
  'details.styles.ts',
  'details.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = originalContent;

  // Make sure to always use the system chevron
  content = content.replaceAll(
    // eslint-disable-next-line no-template-curly-in-string
    "name=${isRtl ? 'chevron-left' : 'chevron-right'}",
    'name="chevron-down"',
  );

  content = removeSections([
    // Remove rtl support in render as we do not need it
    ['const isRtl', ';\n'],
    ['\'details--rtl', 'isRtl'],
  ], content);

  // Add support for size attribute
  content = addSectionAfter(
    content,
    '@property({ type: Boolean, reflect: true }) disabled = false;',
    `
  /** The details's size. */
  @property({ reflect: true }) size: 'small' | 'medium' = 'small';
    `,
  );

  content = addSectionAfter(
    content,
    'details: true,',
    `          'details--size-small': this.size === 'small',
          'details--size-medium': this.size === 'medium',
    `,
  );

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
    // We do not need rtl handling as we use the system chevron
    ['.details--open.details--rtl', '}'],
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
  const content = replaceSections(
    [
      // Adjust the test for the new size attribute
      [
        'expect(firstBody.clientHeight).to.equal(232); // 200 + 16px + 16px (vertical padding)',
        'expect(firstBody.clientHeight).to.equal(240); // 200 + 16px + 24px (vertical padding) for size medium',
      ],
      [
        'expect(secondBody.clientHeight).to.equal(432); // 400 + 16px + 16px (vertical padding)',
        'expect(secondBody.clientHeight).to.equal(440); // 400 + 16px + 24px (vertical padding) for size medium',
      ],
    ],
    originalContent,
  );

  return {
    content,
    path,
  };
};

export const vendorDetails = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('details.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('details.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('details.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
