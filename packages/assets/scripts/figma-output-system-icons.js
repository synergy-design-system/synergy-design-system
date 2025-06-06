/* eslint-disable max-len */
/**
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 */
import { readFile, writeFile } from 'node:fs/promises';

/**
 * Update the system icons of a file
 * @param {Object} options - Configuration options for the outputter.
 * @param {function(ComponentNode): boolean} [options.componentFilter] - Function to filter components.
 * @param {function(unknown): string} [options.getBasename] - Function to get the basename of the component.
 * @param {string} [options.output='./system-icons.ts'] - Path to the output file.
 * @returns {ComponentOutputter}
 */
export const outputSystemIcons = ({
  componentFilter = () => true,
  getBasename = ({ basename = '' }) => basename,
  output = './system-icons.ts',
}) => async (pages) => {
  const allIcons = pages
    // Filter out pages that do not have components
    .map(page => page.components.filter(c => c?.svg.length > 0))
    // Flatten the array of arrays into a single array
    .flat()
    .filter(componentFilter)
    // Map to an array of objects with name and svg
    .map(c => ([
      getBasename({
        componentName: c.name,
        ...c.figmaExport,
      }),
      c.svg,
    ]))
    // Sort by name of the component
    .sort((a, b) => a.at(0).localeCompare(b.at(0)))
    // Final output as key/value string object
    .reduce((acc, [name, svg]) => {
      acc[name] = svg;
      return acc;
    }, {});

  try {
    const fileContent = await readFile(output, 'utf-8');

    // Exchange the old system icons with the new ones in the components package
    const regex = /\/\/\s*\*\*Start system icons\*\*([\s\S]*?)\/\/\s*\*\*End system icons\*\*/;
    const replacedContent = `// **Start system icons**
const icons = ${JSON.stringify(
  allIcons,
  null,
  2,
)};
// **End system icons**`;

    const outputContent = fileContent.replace(regex, replacedContent);

    await writeFile(output, outputContent, 'utf-8');
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error reading file ${output}:`, error);
    return false;
  }
};
