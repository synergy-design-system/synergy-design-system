import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  '_utility.css',
];

const transformUtilities = (_, originalContent) => {
  const replacedContent = replaceSections([
    // Adjust the margin utility classes to use the new spacing tokens
    ['margin: var(--syn-spacing-medium);', 'margin: var(--syn-spacing-small);'],
  ], originalContent);

  // Make sure to disable stylelint for this file.
  // We also reenable it as it is part of a bundle and we do not want to loose the stylelint checks.
  const content = `
/* stylelint-disable */
${replacedContent}
/* stylelint-enable */
  `.trim();

  return {
    content,
    path: 'src/styles/utility.css',
  };
};

export const vendorThemes = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('_utility.css')) {
    return transformUtilities(path, content);
  }

  return output;
};
