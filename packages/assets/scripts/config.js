// icons config
export const FIGMA_FILE_ID_ICONS = 'bZFqk9urD3NlghGUKrkKCR';
export const FIGMA_ID_ICONS = '1616-1509';

/**
 * @todo: Change to FIGMA_FILE_ID_ICONS after 2025 merge is complete
 */
export const FIGMA_FILE_ID_SYSTEM_ICONS = 'nv3f3ZfyRyMg8xrjMsfnFQ';

export const FIGMA_ID_LOGOS = '41-4000';

// V2 Figma paths
export const FIGMA_FILE_ID_ICONS_V2 = 'bZFqk9urD3NlghGUKrkKCR';
export const FIGMA_ID_ALL_ICONS_V2 = '1616-1512';

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

export const PATH_ICONS_V3 = 'src/sick2025';
export const PATH_SYSTEM_ICONS_V3 = 'src/system-icons-sick2025';

export const PATH_DEFAULT_ICONS_2018 = 'src/default-icons.ts';
export const PATH_DEFAULT_ICONS_2025_FILLED = 'src/sick2025-filled-icons.ts';
export const PATH_DEFAULT_ICONS_2025_OUTLINE = 'src/sick2025-outline-icons.ts';

export const PATH_FONTS = 'src/fonts';
export const PATH_FONT_SICK_INTL = `${PATH_FONTS}/SickIntl`;

export const PATH_LICENSES = './licenses';
export const LICENSE_SICK = `${PATH_LICENSES}/SICK.txt`;
export const LICENSE_ICONS = `${PATH_LICENSES}/Apache2.txt`;
export const LICENSE_SICK_INTL = `${PATH_LICENSES}/SICKIntl.txt`;

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
    license: LICENSE_SICK_INTL,
    name: 'SICK Intl',
    paths: [PATH_FONT_SICK_INTL],
  },
  {
    license: LICENSE_ICONS,
    name: 'Material Icons License',
    paths: [
      PATH_ICONS_V2,
      PATH_SYSTEM_ICONS_V2,
      PATH_ICONS_V3,
      PATH_SYSTEM_ICONS_V3,
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
  PATH_SYSTEM_ICONS_V3,
  PATH_DEFAULT_ICONS_2018,
  PATH_DEFAULT_ICONS_2025_FILLED,
  PATH_DEFAULT_ICONS_2025_OUTLINE,
  PATH_COMPONENT_OVERVIEW,
];
