export const vendorSelect = (path, content) => {
  const output = { content, path };

  // Skip for non select
  if (!path.includes('select.component.ts')
    && !path.includes('select.styles.ts')
    && !path.includes('select.test.ts')
  ) {
    return output;
  }

  console.log(path);
  return output;
};
