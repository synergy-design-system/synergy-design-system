import {
  addSectionAfter,
  addSectionBefore,
} from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'dropdown.component.ts',
  'dropdown.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // #849: Mark hoist as deprecated
  let content = addSectionAfter(
    originalContent,
    'Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.',
    '* @deprecated This property is deprecated and will be removed in the next major version.',
    { newlinesBeforeInsertion: 1, tabsBeforeInsertion: 2 },
  );

  return {
    content,
    path,
  };
};

const transformTests = (path, originalContent) => {
  // #854: Make sure flaky tests are skipped for webkit
  const content = addSectionBefore(
    originalContent,
    'const el = await fixture<SynDropdown>(html`<custom-wrapper-arbitrary></custom-wrapper-arbitrary>`);',
    `// This test is flaky, at least on local systems.
      // Therefore, we skip it in Safari.
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        // eslint-disable-next-line no-console
        console.warn('Skipping dropdown focus test in Safari because of false positives');
        return;
      }`,
    { tabsAfterInsertion: 3 },
  );

  return {
    content,
    path,
  };
};

export const vendorDropdown = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('dropdown.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('dropdown.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
