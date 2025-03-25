import { removeSections } from '../remove-section.js';
import { addSectionsAfter, replaceSection, replaceSections } from '../replace-section.js';

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

  content = replaceSections(
    [
      // Make sure to always use the system chevron
      [
        // eslint-disable-next-line no-template-curly-in-string
        "name=${isRtl ? 'chevron-left' : 'chevron-right'}",
        'name="chevron-down"',
      ],

      // Make sure to only call the disconnect method if the detailsObserver exists
      [
        'this.detailsObserver.disconnect();',
        'this.detailsObserver?.disconnect();',
      ],
    ],
    content,
  );

  content = removeSections([
    // Remove rtl support in render as we do not need it
    ['const isRtl', ';\n'],
    ['\'details--rtl', 'isRtl'],
  ], content);

  content = addSectionsAfter([
    // Add support for size attribute
    [
      '@property({ type: Boolean, reflect: true }) disabled = false;',
      `/** The details's size. */
  @property({ reflect: true }) size: 'medium' | 'large' = 'medium';`,
      { newlinesBeforeInsertion: 2, tabsBeforeInsertion: 1 },
    ],
    // Add classes for size attribute
    [
      'details: true,',
      `'details--size-medium': this.size === 'medium',
          'details--size-large': this.size === 'large',`,
      { tabsBeforeInsertion: 5 },
    ],

    // Add support for contained attribute
    [
      '@property({ type: Boolean, reflect: true }) disabled = false;',
      `/** Draws the details as contained element. */
  @property({ type: Boolean, reflect: true }) contained = false;`,
      { newlinesBeforeInsertion: 2, tabsBeforeInsertion: 1 },
    ],
    // Add classes for 'contained' attribute
    [
      '\'details--disabled\': this.disabled,',
      '\'details--contained\': this.contained,',
      { tabsBeforeInsertion: 5 },
    ],
  ], content);

  // #811: Add support for the details-body part
  content = addSectionsAfter([
    [
      '@csspart content - The details content.',
      ' * @csspart details-body - The container that wraps the details content.',
    ],
  ], content);

  content = replaceSection([
    'class="details__body"',
    'class="details__body" part="details-body"',
  ], content);

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
        'expect(firstBody.clientHeight).to.equal(240); // 200 + 24px + 16px (vertical padding)',
      ],
      [
        'expect(secondBody.clientHeight).to.equal(432); // 400 + 16px + 16px (vertical padding)',
        'expect(secondBody.clientHeight).to.equal(440); // 400 + 24px + 16px (vertical padding)',
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
