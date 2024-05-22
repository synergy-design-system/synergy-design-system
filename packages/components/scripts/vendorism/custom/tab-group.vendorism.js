/* eslint-disable no-template-curly-in-string */
import { removeSections } from '../remove-section.js';
import { addSectionAfter, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'tab-group.component.ts',
  'tab-group.styles.ts',
  'tab-group.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = replaceSections([
    // We use a default icon of "chevron-down" and rotate it depending on localization direction
    [
      "name=${isRtl ? 'chevron-right' : 'chevron-left'}",
      'name="chevron-down"',
    ],
    [
      "name=${isRtl ? 'chevron-left' : 'chevron-right'}",
      'name="chevron-down"',
    ],

    // we don`t want the 'bottom' placement, therefore we remove it
    [
      "['top', 'bottom']",
      "['top']",
    ],
    [
      "@property() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';",
      "@property() placement: 'top' | 'start' | 'end' = 'top';",
    ],
    [
      "@property() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';",
      "@property() placement: 'top' | 'start' | 'end' = 'top';",
    ],
    // adapt indicator styling for 'nested' and 'contained' tabs
    [
      'this.indicator.style.width = `${width}px`;',
      "this.indicator.style.width = `calc(${width}px - ${ (this.contained || this.nested) ? '2 * var(--syn-spacing-large)' : '0px' })`;",
    ],
    [
      'this.indicator.style.translate = isRtl ? `${-1 * offset.left}px` : `${offset.left}px`;',
      "this.indicator.style.translate = `calc(${isRtl ? '-' : ''}1 * (${offset.left}px + ${ (this.contained || this.nested) ? 'var(--syn-spacing-large)' : '0px' }))`;",
    ],
    [
      'this.indicator.style.height = `${height}px`;',
      "this.indicator.style.height = `calc(${height}px - ${ (this.contained || this.nested) ? '2 * var(--syn-spacing-small)' : '0px' })`;",
    ],
    [
      'this.indicator.style.translate = `0 ${offset.top}px`;',
      "this.indicator.style.translate = `0 calc(${offset.top}px + ${ (this.contained || this.nested) ? 'var(--syn-spacing-small)' : '0px' })`;",
    ],
  ], originalContent);

  content = removeSections([
    [
      'render() {',
      "const isRtl = this.localize.dir() === 'rtl';", { preserveStart: true, removePrecedingWhitespace: false },
    ],

    // remove 'bottom' placement
    [
      "case 'bottom'",
      ':',
    ],
    [
      "'tab-group--bottom': this.placement === 'bottom'",
      ',',
    ],
  ], content);

  // Add 'contained' and 'nested' property
  content = addSectionAfter(
    content,
    "@property({ attribute: 'no-scroll-controls', type: Boolean }) noScrollControls = false;",
    `
  /** Draws the tab group as a contained element. */
  @property({ type: Boolean }) contained = false;
  
  /** Draws the tab group as a nested element. Can be used when nesting multiple syn-tab-group\`s to create hierarchy. Takes only effect if used with the 'contained' property */
  @property({ type: Boolean }) nested = false;`,
  );

  // Add 'contained' and 'nested' classes
  content = addSectionAfter(
    content,
    "'tab-group--has-scroll-controls': this.hasScrollControls",
      `,
          'tab-group--contained': this.contained,
          'tab-group--nested': this.nested,`,
      { newlinesBeforeInsertion: 0 },
  );

  // Add a new css variable '--indicator-width' to the component
  content = addSectionAfter(
    content,
    '* @cssproperty --indicator-color - The color of the active tab indicator.',
    ' * @cssproperty --indicator-width - The width of the active tab indicator.',
  );

  return {
    content,
    path,
  };
};

const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove 'bottom' placement styling
    [
      '* Bottom',
      '* Start',
      { preserveEnd: true, removePrecedingWhitespace: false },
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

const transformTests = (path, originalContent) => {
  const content = removeSections([
    // Remove 'bottom' placement test
    [
      "it('shows the header below the tabs by setting placement to bottom'",
      '});',
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorTabGroup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tab-group.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('tab-group.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('tab-group.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
