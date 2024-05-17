import { removeSections } from '../remove-section.js';
import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'tab-group.component.ts',
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
      // eslint-disable-next-line no-template-curly-in-string
      'name=${isRtl ? \'chevron-right\' : \'chevron-left\'}',
      'name="chevron-down"',
    ],
    [
      // eslint-disable-next-line no-template-curly-in-string
      'name=${isRtl ? \'chevron-left\' : \'chevron-right\'}',
      'name="chevron-down"',
    ],
  ], originalContent);

  content = removeSections([
    [
      'render() {',
      'const isRtl = this.localize.dir() === \'rtl\';', { preserveStart: true, removePrecedingWhitespace: false }],
  ], content);

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

  return output;
};
