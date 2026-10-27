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
 * Outputs components to a json file list
 * @returns {ComponentOutputter}
 */
export const outputComponentsToCodeConnect = ({
  fileId = '',
  getBasename = ({ basename = '' }) => basename,
  output = './icons.figma.batch.json',
}) => async (pages) => {
  const components = pages.flatMap(page => {
    const pageName = page.name;
    return page.components
      .filter(c => c?.svg.length > 0)
      .map(c => ({
        component: 'SynIcon',
        name: getBasename({
          componentName: c.name,
          pageName,
          ...c.figmaExport,
        }),
        source: 'https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/icon/icon.component.ts',
        url: `https://www.figma.com/design/${fileId}?node-id=${c.id}`,
      }));
  }).sort((left, right) => left.name.localeCompare(right.name));

  return writeToFileSystem(output, `${JSON.stringify({
    components,
    templateFile: './icons.figma.batch.ts',
  }, null, 2)}\n`);
};
