import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'breadcrumb.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const content = replaceSections([
    // We use a default icon of "chevron-down" and rotate it depending on localization direction
    [
      // eslint-disable-next-line no-template-curly-in-string
      '<syn-icon name=${this.localize.dir() === \'rtl\' ? \'chevron-left\' : \'chevron-right\'} library="system"></syn-icon>',
      // eslint-disable-next-line no-template-curly-in-string
      '<syn-icon name="chevron-down" library="system" class=${this.localize.dir()}></syn-icon>',
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorBreadcrumb = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('breadcrumb.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
