/**
 * @typedef {import('@figma-export/types').ComponentsCommandOptions} ComponentsCommandOptions
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 */
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo';
import * as FIGMA_CONFIG from './config.js';
import {
  figmaOutputSvg,
  figmaOutputThumbnails,
  outputComponentsToBundle,
  outputComponentsToCodeConnect,
  outputSystemIcons,
} from './output/index.js';
import {
  createFileNameForLogo,
  getLogoVariantPartsFromOptionString,
} from './utils.js';

/**
 * @typedef {Object} Options
 * @property {string} basename - The base name for the SVG file, typically the component name.
 * @property {string} dirname - The directory name for the SVG file, typically derived from the component's page.
 * @property {componentName: string} componentName - The name of the component.
 * @property {string} pageName - The name of the page.
 */

/**
 * Create a configuration object for the figma export
 * @param {Object} options - Configuration options for the Figma export.
 * @param {ComponentOutputter[]} [options.additionalOutputters=[]] - Additional outputters to use.
 * @param {string} [options.fileId=''] - The Figma file ID to export from.
 * @param {function(ComponentNode): boolean} [options.filterComponent] - Function to filter components.
 * @param {string[]} [options.ids=[]] - The IDs of the components to export.
 * @param {string[]} [options.includeTypes=[]] - Types of components to include in the export.
 * @param {string[]} [options.onlyFromPages=[]] - The pages to include in the export.
 * @param {boolean} [options.optimizeSVG=true] - Whether to optimize SVG output.
 * @param {string} [options.path='icons'] - Path where the exported files will be saved.
 * @param {function(Options): string} [options.svgComponentBasename] - Function to get the base name for SVG components.
 * @param {function(ComponentNode): boolean} [options.svgComponentFilter] - Function to filter SVG components.
 * @returns {ComponentsCommandOptions} - The configuration object for the Figma export.
 */
export const createFigmaExportConfig = ({
  additionalOutputters = [],
  fileId = '',
  filterComponent = () => true,
  ids = [],
  includeTypes = ['COMPONENT', 'VARIANT'],
  onlyFromPages = [],
  optimizeSVG = true,
  path = 'icons',
  svgComponentBasename = ({ basename = '' }) => `${basename.replace('name=', '')}.svg`,
  svgComponentFilter = () => true,
// eslint-disable-next-line complexity
}) => ({
  fileId,
  filterComponent,
  ids,
  includeTypes,
  onlyFromPages,
  outputters: [
    figmaOutputSvg({
      componentFilter: svgComponentFilter,
      getBasename: svgComponentBasename,
      getDirname: () => path,
      output: '.',
    }),
    ...additionalOutputters,
  ],
  transformers: [
    transformSvgWithSvgo({
      multipass: true,
      plugins: optimizeSVG ? [
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
      ] : [],
    }),
  ],
});

// Global icons configuration
export const systemIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputSystemIcons({
      componentExportFolder: '../components/src/components/icon',
      componentFilter: c => c.figmaExport?.pathToComponent.some(ptc => ptc.name.toLowerCase().includes('system-icons')),
      svgExportFolder: place => {
        if (place === 'sick2018') {
          return FIGMA_CONFIG.PATH_SYSTEM_ICONS_2018;
        }
        return FIGMA_CONFIG.PATH_SYSTEM_ICONS_2025;
      },
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_SYSTEM_ICONS,
  ids: [FIGMA_CONFIG.FIGMA_ID_ICONS],
  includeTypes: ['INSTANCE'],
  // Circumvent the figmaOutputSvg filter for system icons, we handle it ourself
  svgComponentFilter: () => false,
});

// 2018 all icons configuration
export const AllIconsConfig2018 = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2018,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2018.figma.ts',
    }),
    outputComponentsToBundle({
      exportName: 'defaultIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2018}`,
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2018,
  ids: [FIGMA_CONFIG.FIGMA_ID_ALL_ICONS_2018],
  onlyFromPages: ['Assets'],
  path: FIGMA_CONFIG.PATH_ICONS_2018,
});

// 2025 outline icons configuration
export const OutlineIconsConfig2025 = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToBundle({
      exportName: 'outlineIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2025_OUTLINE}`,
    }),
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2025,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-outline.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2025,
  ids: [FIGMA_CONFIG.FIGMA_ID_OUTLINE_ICONS_2025],
  onlyFromPages: ['Icons'],
  path: `${FIGMA_CONFIG.PATH_ICONS_2025}/outline`,
});

// 2025 filled icons configuration
export const FilledIconsConfig2025 = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToBundle({
      exportName: 'filledIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2025_FILLED}`,
    }),
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2025,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-filled.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2025,
  ids: [FIGMA_CONFIG.FIGMA_ID_FILLED_ICONS_2025],
  onlyFromPages: ['Icons'],
  path: `${FIGMA_CONFIG.PATH_ICONS_2025}/fill`,
});

// logo configuration (2018 only)
export const LogosConfig2018 = createFigmaExportConfig({
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2018,
  ids: [FIGMA_CONFIG.FIGMA_ID_LOGOS],
  onlyFromPages: ['Assets'],
  optimizeSVG: false,
  path: FIGMA_CONFIG.PATH_LOGOS_2018,
  svgComponentBasename: ({ basename = '' }) => {
    // Split the base name into parts by variant.
    // Variants look like this in figma:
    // variant=logo, color=black, theme=sick2018
    const [variant, color, theme] = getLogoVariantPartsFromOptionString(basename);

    // Make sure we export stuff that does not fit our pattern as the original filename
    if (!variant || !color || !theme) {
      return `${basename.replace('name=', '')}.svg`;
    }

    return createFileNameForLogo(variant, color, theme);
  },
  svgComponentFilter: ({ name }) => {
    const [, , theme] = getLogoVariantPartsFromOptionString(name);
    return theme === 'sick2018';
  },
});

// logo configuration (2025 only)
export const LogosConfig2025 = createFigmaExportConfig({
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_2018,
  ids: [FIGMA_CONFIG.FIGMA_ID_LOGOS],
  onlyFromPages: ['Assets'],
  optimizeSVG: false,
  path: FIGMA_CONFIG.PATH_LOGOS_2025,
  svgComponentBasename: ({ basename = '' }) => {
    // Split the base name into parts by variant.
    // Variants look like this in figma:
    // variant=logo, color=black, theme=sick2018
    const [variant, color, theme] = getLogoVariantPartsFromOptionString(basename);

    // Make sure we export stuff that does not fit our pattern as the original filename
    if (!variant || !color || !theme) {
      return `${basename.replace('name=', '')}.svg`;
    }

    return createFileNameForLogo(variant, color, theme);
  },
  svgComponentFilter: ({ name }) => {
    const [, , theme] = getLogoVariantPartsFromOptionString(name);
    return theme === 'sick2025';
  },
});

/**
 * Configuration for exporting component thumbnails from the Figma library.
 * @type {ComponentsCommandOptions} Configuration for exporting component thumbnails.
 */
export const thumbnailsConfig = {
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_LIBRARY,
  ids: ['1234:20960'],
  onlyFromPages: ['Component overview'],
  outputters: [
    figmaOutputThumbnails({
      extractIndividualComponents: true,
      getBasename: () => 'overview.svg',
      getDirname: () => '.',
      output: FIGMA_CONFIG.PATH_COMPONENT_OVERVIEW,
    }),
  ],
  transformers: [
    transformSvgWithSvgo({
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
      ],
    }),
  ],
};

/**
 * 2018 consists of all icons and system icons.
 */
export const CONFIG_FOR_2018 = [
  AllIconsConfig2018,
];

/**
 * 2025 consists of outline and filled icons.
 */
export const CONFIG_FOR_2025 = [
  OutlineIconsConfig2025,
  FilledIconsConfig2025,
];

/**
 * Configuration for all icons, including both 2018 and 2025.
 */
export const CONFIG_FOR_ALL = [
  systemIconsConfig,
  LogosConfig2018,
  LogosConfig2025,
  thumbnailsConfig,
  ...CONFIG_FOR_2018,
  ...CONFIG_FOR_2025,
];

/**
 * Default configuration to use.
 * Set this to CONFIG_FOR_ALL to export all icons
 */
export const DEFAULT_CONFIG = CONFIG_FOR_ALL;
