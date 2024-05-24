import {
  addSectionsAfter, addSectionsBefore, replaceSections,
} from '../replace-section.js';

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
  let content = addSectionsAfter([
    // Add prefix slot documentation
    [
      '* @slot - The tab\'s label.',
      ' * @slot prefix - Used to prepend an icon or similar element to the tab.',
    ],

    // Add prefix css part documentation
    [
      '* @csspart close-button__base - The close button\'s exported `base` part.',
      ' * @csspart prefix - The prefix container.',
    ],

    // Add 'placement', 'sharp' and 'contained' classes
    [
      "'tab--disabled': this.disabled",
      `,
          'tab--contained': this.contained,
          'tab--sharp': this.sharp,
          'tab--end': this.placement === 'end',
          'tab--start': this.placement === 'start',
          'tab--top': this.placement === 'top',
          'tab--rtl': this.localize.dir() === 'rtl',`,
      { newlinesBeforeInsertion: 0 },
    ],
  ], originalContent);

  content = addSectionsBefore([
    // Add prefix slot
    [
      '<slot></slot>',
      '<slot name="prefix" part="prefix" class="tab__prefix"></slot>',
      { newlinesAfterInsertion: 2, tabsAfterInsertion: 4 },
    ],

    // Add 'placement', 'sharp' and 'contained' properties
    [
      'connectedCallback() {',
      `/** Draws the tab as a contained element. */
  @property({ type: Boolean }) contained = false;

  /** Draws the tab with edges instead of roundings. Takes only effect if used with the 'contained' property */
  @property({ type: Boolean }) sharp = false;

  /** The placement of the tabs. */
  @property() placement: 'top' | 'start' | 'end' = 'top';`,
      { tabsAfterInsertion: 1 },
    ],

  ], content);

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
