/**
 * @typedef {import('@figma-export/types').ComponentsCommandOptions} ComponentsCommandOptions
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 */
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo';
import * as FIGMA_CONFIG from './config.js';
import { outputComponentsToBundle } from './figma-output-bundle-icons.js';
import { figmaOutputThumbnails } from './figma-output-thumbnails.js';
import { figmaOutputSvg } from './figma-output-svg.js';
import { outputSystemIcons } from './figma-output-system-icons.js';
import { outputComponentsToCodeConnect } from './figma-output-export-code-connect.js';
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
          return FIGMA_CONFIG.PATH_SYSTEM_ICONS_V2;
        }
        return FIGMA_CONFIG.PATH_SYSTEM_ICONS_V3;
      },
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_SYSTEM_ICONS,
  ids: [FIGMA_CONFIG.FIGMA_ID_ICONS],
  includeTypes: ['INSTANCE'],
  // Circumvent the figmaOutputSvg filter for system icons, we handle it ourself
  svgComponentFilter: () => false,
});

// v2 all icons configuration
export const v2AllIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2018.figma.ts',
    }),
    outputComponentsToBundle({
      exportName: 'defaultIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2018}`,
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
  ids: [FIGMA_CONFIG.FIGMA_ID_ALL_ICONS_V2],
  onlyFromPages: ['Assets'],
  path: FIGMA_CONFIG.PATH_ICONS_V2,
});

// v3 outline icons configuration
export const v3OutlineIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToBundle({
      exportName: 'outlineIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2025_OUTLINE}`,
    }),
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-outline.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
  ids: [FIGMA_CONFIG.FIGMA_ID_OUTLINE_ICONS_V3],
  onlyFromPages: ['Icons'],
  path: `${FIGMA_CONFIG.PATH_ICONS_V3}/outline`,
});

// v3 filled icons configuration
export const v3FilledIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToBundle({
      exportName: 'filledIcons',
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: `./${FIGMA_CONFIG.PATH_DEFAULT_ICONS_2025_FILLED}`,
    }),
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-filled.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
  ids: [FIGMA_CONFIG.FIGMA_ID_FILLED_ICONS_V3],
  onlyFromPages: ['Icons'],
  path: `${FIGMA_CONFIG.PATH_ICONS_V3}/fill`,
});

// logo configuration
export const logosConfig = createFigmaExportConfig({
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
  ids: [FIGMA_CONFIG.FIGMA_ID_LOGOS],
  onlyFromPages: ['Assets'],
  optimizeSVG: false,
  path: 'src/logos',
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
 * V2 consists of all icons and system icons.
 */
export const CONFIG_FOR_V2 = [
  v2AllIconsConfig,
];

/**
 * V3 consists of outline and filled icons.
 */
export const CONFIG_FOR_V3 = [
  v3OutlineIconsConfig,
  v3FilledIconsConfig,
];

/**
 * Configuration for all icons, including both V2 and V3.
 */
export const CONFIG_FOR_ALL = [
  systemIconsConfig,
  logosConfig,
  thumbnailsConfig,
  ...CONFIG_FOR_V2,
  ...CONFIG_FOR_V3,
];

/**
 * Default configuration to use.
 * Set this to CONFIG_FOR_ALL to export all icons
 */
export const DEFAULT_CONFIG = CONFIG_FOR_ALL;
