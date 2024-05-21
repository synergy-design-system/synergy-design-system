/* eslint-disable no-template-curly-in-string */
import { removeSections } from '../remove-section.js';
import { replaceSections } from '../replace-section.js';

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
  ], originalContent);

  content = removeSections([
    [
      'render() {',
      "const isRtl = this.localize.dir() === 'rtl';", { preserveStart: true, removePrecedingWhitespace: false }
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
