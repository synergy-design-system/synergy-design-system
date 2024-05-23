import { addSectionAfter, addSectionBefore, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'tab.component.ts',
  'tab.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // Add prefix slot
  let content = addSectionBefore(
    originalContent,
    '<slot></slot>',
    '<slot name="prefix" part="prefix" class="tab__prefix"></slot>',
    { newlinesAfterInsertion: 2, tabsAfterInsertion: 4 },
  );

  // Add slots documentation
  content = addSectionAfter(
    content,
    '* @slot - The tab\'s label.',
    ' * @slot prefix - Used to prepend an icon or similar element to the tab.',
  );

  // Add css parts documentation
  content = addSectionAfter(
    content,
    '* @csspart close-button__base - The close button\'s exported `base` part.',
    ' * @csspart prefix - The prefix container.',
  );

  // Add 'placement', 'nested' and 'contained' properties
  content = addSectionBefore(
    content,
    'connectedCallback() {',
    `/** Draws the tab as a contained element. */
  @property({ type: Boolean }) contained = false;

  /** Draws the tab as a nested element. Takes only effect if used with the 'contained' property */
  @property({ type: Boolean }) nested = false;

  /** The placement of the tabs. */
  @property() placement: 'top' | 'start' | 'end' = 'top';`,
    { tabsAfterInsertion: 1 },
  );

  // Add 'placement', 'nested' and 'contained' classes
  content = addSectionAfter(
    content,
    "'tab--disabled': this.disabled",
    `,
          'tab--contained': this.contained,
          'tab--nested': this.nested,
          'tab--end': this.placement === 'end',
          'tab--start': this.placement === 'start',
          'tab--top': this.placement === 'top',
          'tab--rtl': this.localize.dir() === 'rtl',`,
    { newlinesBeforeInsertion: 0 },
  );

  return {
    content,
    path,
  };
};

const transformTests = (path, originalContent) => {
  const content = replaceSections([
    [
      ".to.equal(' tab ');",
      ".to.equal(' tab tab--top ');",
    ],
    [
      ".to.equal(' tab tab--disabled ');",
      ".to.equal(' tab tab--disabled tab--top ');",
    ],
    [
      ".to.equal(' tab tab--active ');",
      ".to.equal(' tab tab--active tab--top ');",
    ],
    [
      ".to.equal(' tab tab--closable ');",
      ".to.equal(' tab tab--closable tab--top ');",
    ],
  ], originalContent);
  return {
    content,
    path,
  };
};

export const vendorTab = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tab.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('tab.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
