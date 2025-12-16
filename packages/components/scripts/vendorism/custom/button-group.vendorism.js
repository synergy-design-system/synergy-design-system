const FILES_TO_TRANSFORM = [
  'button-group.component.ts',
  'button-group.styles.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = originalContent;
  return {
    content,
    path,
  };
};

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  let content = originalContent;
  return {
    content,
    path,
  };
};

export const vendorButtonGroup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('button-group.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('button-group.styles.ts')) {
    return transformStyles(path, content);
  }

  return output;
};
