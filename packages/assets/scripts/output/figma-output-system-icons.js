/**
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 */
import { join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { optimize } from 'svgo';

/**
 * Filter the fields of an icon object.
 * @param {ComponentNode} icon The icon object containing Figma export data, name, and SVG content.
 * @returns {Pick<ComponentNode, 'figmaExport' | 'name' | 'svg'>} The filtered icon object.
 */
const filterFields = icon => ({
  figmaExport: icon.figmaExport,
  name: icon.name,
  svg: icon.svg,
});

/**
 * Prepare the assets for a component icon.
 * @param {Partial<ComponentNode>} icon The icon object containing Figma export data and name.
 * @returns {Partial<ComponentNode> & { place: string }} The prepared asset object.
 */
const prepareAssets = icon => {
  const {
    name: originalName,
    svg: originalSvg,
  } = icon;
  let place = 'both';
  let name = originalName;
  let svg = originalSvg;

  // Get the name of the component through the export component path
  const path = icon.figmaExport.pathToComponent;

  // If we don´t have a path, use the name of the last entry,
  // otherwise use the second to last one
  if (!path.at(-1).name.startsWith('theme')) {
    name = path.at(-1).name;
  } else {
    place = path.at(-1).name.replace('theme=', '');
    name = path.at(-2).name;
  }

  // Optimize the SVG content
  if (svg) {
    svg = optimize(svg, {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
        {
          name: 'removeAttrs',
          params: { attrs: 'fill' },
        },
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: ["fill='currentColor'"],
          },
        },
      ],
    }).data;
  }

  return {
    ...icon,
    name,
    place,
    svg,
  };
};

/**
 * Duplicate icon sets for different themes.
 * @param {Array<{name: string, svg: string, place: string}>} acc The accumulator array.
 * @param {Partial<ComponentNode> & { place: string }} icon The icon object to duplicate.
 * @returns {Array<{name: string, svg: string, place: string}>} The updated accumulator array with duplicated icons.
 */
const duplicateSets = (acc, icon) => {
  const { name, svg, place } = icon;
  if (place === 'both') {
    acc.push({
      name,
      place: 'sick2018',
      svg,
    });
    acc.push({
      name,
      place: 'sick2025',
      svg,
    });
  } else {
    acc.push({
      name,
      place,
      svg,
    });
  }
  return acc;
};

/**
 * Group icons by their set (e.g. theme).
 * @param {Record<string, Record<string, string>>} acc The accumulator object.
 * @param {Partial<ComponentNode> & { place: string }} icon The icon object to group.
 * @returns {Record<string, Record<string, string>>} The updated accumulator object.
 */
const groupBySet = (acc, icon) => {
  const { name, svg, place } = icon;
  if (!acc[place]) {
    acc[place] = {};
  }
  acc[place][name] = svg;
  return acc;
};

/**
 * Write TypeScript files for the icons.
 * @param {string} outputPath The path to output the TypeScript files.
 * @param {string} iconSet The name of the icon set.
 * @param {Record<string, string>} icons The icons to write to the files.
 * @return {Promise<boolean>} A promise that resolves to true if the files were written successfully, false otherwise.
 */
const writeTsFiles = async (
  outputPath,
  iconSet,
  icons,
) => {
  const output = join(outputPath, `${iconSet}-system-icons.ts`);
  const deprecationNotice = iconSet === 'sick2018'
    ? `
/**
 * @deprecated Consider moving to synergy 2025 icons directly. See https://synergy-design-system.github.io/?path=/docs/migration--docs for further details.
 */
`.trimStart()
    : '';

  try {
    const content = `
/* eslint-disable */
${deprecationNotice}
export const icons = ${JSON.stringify(icons, null, 2)};
`.trimStart();
    await writeFile(output, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error reading file ${output}:`, error);
    return false;
  }
};

/**
 * Write svg files for the icons.
 * @param {string} outputPath The path to output the TypeScript files.
 * @param {Record<string, string>} icons The icons to write to the files.
 * @return {Promise<boolean>} A promise that resolves to true if the files were written successfully, false otherwise.
 */
const writeSvgFiles = async (
  outputPath,
  icons,
) => {
  const output = outputPath;

  // Create the directory if it does not exist
  try {
    await mkdir(output, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${output}:`, error);
    return false;
  }

  const writeSuccess = Object
    .entries(icons)
    .map(async ([name, svg]) => {
      const filename = join(output, `${name}.svg`);
      try {
        await writeFile(filename, svg, 'utf-8');
        return true;
      } catch (error) {
        console.error(`Error writing file ${filename}:`, error);
        return false;
      }
    });

  const result = await Promise.all(writeSuccess);
  return result.every(Boolean);
};

/**
 * Update the system icons of a file
 * @param {Object} options - Configuration options for the outputter.
 * @param {string} [options.componentExportFolder='./'] - Path to the output folder for ts assets.
 * @param {function(ComponentNode): boolean} [options.componentFilter] - Function to filter components.
 * @param {function(string): string} [options.svgExportFolder=(place) => './'] - Function to get the path to the output folder for svg assets.
 * @returns {ComponentOutputter}
 */
export const outputSystemIcons = ({
  componentExportFolder = './',
  componentFilter = () => true,
  svgExportFolder = () => './',
}) => async (pages) => {
  const allIcons = pages
    // Filter out pages that do not have components
    .map(page => page.components.filter(c => c?.svg.length > 0))
    // Flatten the array of arrays into a single array
    .flat()
    // Apply the component filter
    .filter(componentFilter)
    // Filter out the fields we need
    .map(filterFields)
    // Make sure to prepare the assets
    // so they can be saved to different places in the filesystem
    .map(prepareAssets)
    // Sort by name of the component
    .sort((a, b) => a.name.localeCompare(b.name))
    // Make sure icons that are available for both sets are duplicated to the sets
    .reduce(duplicateSets, [])
    // Group the outputs as an object by place
    .reduce(groupBySet, {});

  // Write the icons to the filesystem
  // Writes one file per icon set
  const createdTsFileResults = Object
    .entries(allIcons)
    .map(async ([place, icons]) => writeTsFiles(componentExportFolder, place, icons));

  // Create the svg files in the file system
  const createdSVGFileResults = Object
    .entries(allIcons)
    .map(async ([place, icons]) => writeSvgFiles(svgExportFolder(place), icons));

  const resultsTsFiles = await Promise.all(createdTsFileResults);
  const resultsSVGFiles = await Promise.all(createdSVGFileResults);
  const results = [...resultsTsFiles, ...resultsSVGFiles];
  return results.every(Boolean);
};
