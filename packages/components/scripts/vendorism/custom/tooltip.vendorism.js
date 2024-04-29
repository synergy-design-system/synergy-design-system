const FILES_TO_TRANSFORM = [
  'tooltip.component.ts',
];

/**
 * Transform the components file
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // Get a 4px spacing between nupsi and anchor
  const content = originalContent.replace(
    '@property({ type: Number }) distance = 8;',
    '@property({ type: Number }) distance = 13;',
  );

  return {
    content,
    path,
  };
};

export const vendorTooltip = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tooltip.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
