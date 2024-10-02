import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'breadcrumb-item.component.ts',
  'breadcrumb-item.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => ({
  content: originalContent,
  path,
});

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTest = (path, originalContent) => {
  const content = replaceSections([
    // Adjust accessability tests to make sure they ignore the color contrast
    // Newer versions of the axe plugin need a direct variable in the closure and do NOT work
    // with the `el` reference, so make sure to use a dummy var.
    [
      'await expect(el).to.be.accessible();',
      'const x = await el; await expect(x).to.be.accessible({ ignoredRules: ["color-contrast"] });',
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorBreadcrumbItem = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('breadcrumb-item.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('breadcrumb-item.test.ts')) {
    return transformTest(path, content);
  }

  return output;
};
