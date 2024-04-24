/**
 * Vendorism for the progress-bar component
 * @param {string} path Path to the vendored file
 * @param {string} content Content of the vendored file
 * @returns Object containing (possibly) changed content and original path
 */
export const vendorProgressBar = (path, content) => {
  if (!path.endsWith('progress-bar.component.ts')) {
    return {
      content,
      path,
    };
  }

  // Add missing documentation for the speed css property
  const nextContent = content.replace(
    'color of the label.',
    `color of the label.
 * @cssproperty --speed - The speed of the progress bar when in indeterminate state.`,
  );

  return {
    content: nextContent,
    path,
  };
};
