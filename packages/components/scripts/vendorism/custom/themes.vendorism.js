const FILES_TO_TRANSFORM = [
  '_utility.css',
];

const transformUtilities = (originalPath, originalContent) => {
  // Make sure to disable stylelint for this file.
  // We also reenable it as it is part of a bundle and we do not want to loose the stylelint checks.
  const content = `
/* stylelint-disable */
${originalContent}
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
