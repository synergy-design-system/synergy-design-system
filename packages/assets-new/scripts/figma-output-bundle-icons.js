/**
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 */
import {
  mkdir,
  writeFile,
} from 'node:fs/promises';

/**
 * Write the content to the file system.
 * @param {string} filePath The file path to write to
 * @param {string} content The content to write to the file
 * @returns {Promise<boolean>}
 */
const writeToFileSystem = async (filePath, content) => {
  try {
    await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
    await writeFile(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

/**
 * Outputs components to a bundle format.
 * @returns {ComponentOutputter}
 */
export const outputComponentsToBundle = ({
  exportName = 'defaultIcons',
  getBaseName = ({ basename = '' }) => basename,
  output = './svg-bundle.ts',
}) => async (pages) => {
  const outputFiles = pages.map(page => {
    const pageName = page.name;
    const svgContent = page.components
      // Remove components without SVG content
      .filter(c => c?.svg.length > 0)
      // Map to an array of [name, svg] pairs
      .map(c => [
        getBaseName({
          componentName: c.name,
          pageName,
          ...c.figmaExport,
        }),
        c.svg,
      ])
      // Sort by name of the tuple
      .sort((a, b) => a.at(0).localeCompare(b.at(0)));

    const contentString = JSON.stringify(
      Object.fromEntries(svgContent),
      null,
      2,
    );

    const contents = `
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/comma-dangle */
export const ${exportName || pageName} = ${contentString};
`.trimStart();

    return {
      contents,
      filePath: output,
    };
  });

  const creation = outputFiles.map(({
    contents,
    filePath,
  }) => writeToFileSystem(filePath, contents));

  try {
    await Promise.allSettled(creation);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error writing files:', error);
    return false;
  }
};
