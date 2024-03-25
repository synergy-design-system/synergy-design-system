const FILES_TO_TRANSFORM = [
  'badge.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, content) => {
  console.log(content);
  return {
    content,
    path,
  };
};

export const vendorBadge = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('badge.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
