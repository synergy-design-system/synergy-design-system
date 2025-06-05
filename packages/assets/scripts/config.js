// V2 Figma paths
export const FIGMA_FILE_ID_ICONS_V2 = 'bZFqk9urD3NlghGUKrkKCR';
export const FIGMA_ID_SYSTEM_ICONS_V2 = '1616-1509';
export const FIGMA_ID_ALL_ICONS_V2 = '1616-1512';
export const FIGMA_ID_LOGOS_V2 = '41-4000';

// V3 Figma paths
export const FIGMA_FILE_ID_ICONS_V3 = 'ltRW0fLoFIuHyuh73DsjrZ';
export const FIGMA_ID_FILLED_ICONS_V3 = '4-713';
export const FIGMA_ID_OUTLINE_ICONS_V3 = '4-731';

// Library Figma paths
export const FIGMA_FILE_ID_LIBRARY = '3cQ9BFSSaoVfhizV0AJ9GP';
export const FIGMA_ID_COMPONENT_OVERVIEW = '1234:20961';

// Paths
export const PATH_ICONS_V2 = 'src/icons';
export const PATH_LOGOS_V2 = 'src/logos';
export const PATH_SYSTEM_ICONS_V2 = 'src/system-icons';
export const PATH_COMPONENT_OVERVIEW = 'src/component-thumbnails';

export const PATH_ICONS_V3 = 'src/brand2025';

export const PATH_DEFAULT_ICONS = 'src/default-icons.ts';

export const PATH_LICENSES = './licenses';
export const LICENSE_SICK = `${PATH_LICENSES}/SICK.txt`;
export const LICENSE_ICONS = `${PATH_LICENSES}/Apache2.txt`;

/**
 * @type {LicenseEntry[]} List of licenses used in the project.
 * @typedef {Object} LicenseEntry
 * @property {string} license - The path to the license file.
 * @property {string} name - The name of the license.
 * @property {string[]} paths - The paths that are covered by this license.
 */
export const LICENSE_MAP = [
  {
    license: LICENSE_SICK,
    name: 'SICK Proprietary Logos',
    paths: [PATH_LOGOS_V2],
  },
  {
    license: LICENSE_ICONS,
    name: 'Material Icons License',
    paths: [
      PATH_ICONS_V2,
      PATH_SYSTEM_ICONS_V2,
    ],
  },
];

/**
 * List of paths that have dynamic output that is created via Typescript or Figma configuration.
 * They are not static and can change based on the configuration or the files being processed.
 */
export const DYNAMIC_OUTPUT_PATHS = [
  PATH_ICONS_V2,
  PATH_LOGOS_V2,
  PATH_SYSTEM_ICONS_V2,
  PATH_ICONS_V3,
  PATH_DEFAULT_ICONS,
  PATH_COMPONENT_OVERVIEW,
];
