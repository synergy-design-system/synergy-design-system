import { getAllComponents } from '../shared.js';

export const getMetadataPathForComponent = (component, rootDir) => `${rootDir}/metadata/components/${component.tagName}/`;

/**
 * Get the metadata paths for all components in the given metadata.
 * @param metadata The metadata object containing component information
 * @param {string} rootDir The root directory where the metadata paths will be created
 * @returns {Promise<string[]>} An array of paths to the metadata directories for each component
 */
export const getMetadataPathsForComponents = async (metadata, rootDir) => {
  const components = await getAllComponents(metadata);
  return components.map(
    c => getMetadataPathForComponent(c, rootDir),
  );
};
