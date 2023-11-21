/**
 * Adjust the custom elements manifest creation file
 * Allows unknown command line args in `custom-elements-manifest.config.js`
 * as otherwise commandLineArgs breaks when we start it from docs
 * @param {string} path Path to the file
 * @param {string} content Contents of the file
 * @returns {object}
 */
export const vendorCustomElementsManifest = (path, content) => {
  if (!path.includes('custom-elements-manifest.config.js')) {
    return {
      content,
      path,
    };
  }

  const nextContent = content
    // Add the partial option for cem
    .replace(`{ name: 'outdir', type: String }
]);`, `{ name: 'outdir', type: String }
], { partial: true })`)
    // Adjust package to use change-case as pascal-case is deprecated
    .replace('import { pascalCase } from \'pascal-case\';', 'import { pascalCase } from \'change-case\';');

  return {
    content: nextContent,
    path,
  };
};
