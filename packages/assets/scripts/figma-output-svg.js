/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/**
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 */

/**
 * @typedef {Object} Options
 * @property {string} basename - The base name for the SVG file, typically the component name.
 * @property {string} dirname - The directory name for the SVG file, typically derived from the component's page.
 * @property {componentName: string} componentName - The name of the component.
 * @property {string} pageName - The name of the page.
 */

/**
 * @typedef {Object} OutputOptions
 * @property {function(ComponentNode): boolean} [options.componentFilter] - Function to filter components.
 * @property {function(Options): string} [getBasename] - Function to get the basename of the SVG file.
 * @property {function(Options): string} [getDirname] - Function to get the directory name for the SVG file.
 * @property {string} output - The output directory where SVG files will be saved.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Create a component outputter that exports SVG files from Figma components.
 * Based on the original @figma-export/output-components-as-svg package,
 * but also provides a deep filter.
 * @see https://github.com/marcomontalbano/figma-export/blob/287ca0538f613b227cfd232bb8fc378d04dc50e4/packages/output-components-as-svg/src/index.ts
 * @param {OutputOptions} options - Configuration options for the outputter.
 * @returns {ComponentOutputter}
 */
export const figmaOutputSvg = ({
  componentFilter = () => true,
  getBasename = (options) => `${options.basename}.svg`,
  getDirname = (options) => `${options.pageName}${path.sep}${options.dirname}`,
  output,
}) => pages => {
  for (const page of pages) {
    const { name: pageName, components } = page;
    for (const component of components) {
      const { name: componentName, svg, figmaExport } = component;
      const options = {
        componentName,
        pageName,
        ...figmaExport,
      };

      if (componentFilter(component)) {
        const filePath = path.resolve(output, getDirname(options));

        fs.mkdirSync(filePath, { recursive: true });
        fs.writeFileSync(path.resolve(filePath, getBasename(options)), svg);
      }
    }
  }
};
