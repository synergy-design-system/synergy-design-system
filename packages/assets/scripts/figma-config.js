/* eslint-disable max-len */
/**
 * @typedef {import('@figma-export/types').ComponentsCommandOptions} ComponentsCommandOptions
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 */
import transformSvgWithSvgo from '@figma-export/transform-svg-with-svgo';
import * as FIGMA_CONFIG from './config.js';
import { outputComponentsToBundle } from './figma-output-bundle-icons.js';
import { figmaOutputSvg } from './figma-output-svg.js';
import { outputSystemIcons } from './figma-output-system-icons.js';
import { outputComponentsToCodeConnect } from './figma-output-export-code-connect.js';

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
  svgComponentFilter = () => true,
}) => ({
  fileId,
  filterComponent,
  ids,
  includeTypes,
  onlyFromPages,
  outputters: [
    figmaOutputSvg({
      componentFilter: svgComponentFilter,
      getBasename: ({ basename = '' }) => `${basename.replace('name=', '')}.svg`,
      getDirname: () => path,
      output: './src',
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

// v2 system icons configuration
export const v2SystemIconConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputSystemIcons({
      componentFilter: c => c.figmaExport?.pathToComponent.some(ptc => ptc.name.toLowerCase().includes('system-icons')),
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/src/components/icon/library.system.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
  ids: [FIGMA_CONFIG.FIGMA_ID_SYSTEM_ICONS_V2],
  includeTypes: ['COMPONENT'],
  path: 'system-icons',
  svgComponentFilter: c => c.figmaExport?.pathToComponent.some(ptc => ptc.name.toLowerCase().includes('system-icons')),
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
      output: './src/default-icons.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
  ids: [FIGMA_CONFIG.FIGMA_ID_ALL_ICONS_V2],
  onlyFromPages: ['Assets'],
  path: 'icons',
});

// v2 logos configuration
export const v2LogosConfig = createFigmaExportConfig({
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V2,
  ids: [FIGMA_CONFIG.FIGMA_ID_LOGOS_V2],
  onlyFromPages: ['Assets'],
  optimizeSVG: false,
  path: 'logos',
});

// v3 outline icons configuration
export const v3OutlineIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-outline.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
  ids: [FIGMA_CONFIG.FIGMA_ID_OUTLINE_ICONS_V3],
  onlyFromPages: ['Icons'],
  path: 'brand2025/outline',
});

// v3 filled icons configuration
export const v3FilledIconsConfig = createFigmaExportConfig({
  additionalOutputters: [
    outputComponentsToCodeConnect({
      fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
      getBasename: ({ basename = '' }) => basename.replace('name=', ''),
      output: '../components/code-connect/icons/sick2025-filled.figma.ts',
    }),
  ],
  fileId: FIGMA_CONFIG.FIGMA_FILE_ID_ICONS_V3,
  ids: [FIGMA_CONFIG.FIGMA_ID_FILLED_ICONS_V3],
  onlyFromPages: ['Icons'],
  path: 'brand2025/fill',
});

/**
 * V2 consists of all icons, system icons and logos.
 */
export const CONFIG_FOR_V2 = [
  v2SystemIconConfig,
  v2AllIconsConfig,
  v2LogosConfig,
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
  ...CONFIG_FOR_V2,
  ...CONFIG_FOR_V3,
];

/**
 * Default configuration to use.
 * Set this to CONFIG_FOR_ALL to export all icons
 */
export const DEFAULT_CONFIG = CONFIG_FOR_V2;
