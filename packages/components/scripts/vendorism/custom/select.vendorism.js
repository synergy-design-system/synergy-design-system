const FILES_TO_TRANSFORM = [
  'select.component.ts',
  'select.styles.ts',
  'select.test.ts',
];

export const vendorSelect = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  console.log(`Todo: Write transforms for ${path}`);
  return output;
};
