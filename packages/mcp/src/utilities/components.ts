import fs from 'node:fs/promises';
import {
  type Framework,
  angularPath,
  componentPath,
  componentStaticPath,
  reactPath,
  staticPath,
  vuePath,
} from './config.js';
import { getAbsolutePath } from './file.js';
import {
  getStructuredMetaData,
  getStructuredMetaDataForComponent,
} from './metadata.js';

/**
 * Get dynamic information about the usage of a specific framework in the Synergy Design System.
 * @param framework The framework to get information about
 * @returns List of structured metadata for the specified framework.
 */
export const getDynamicMetaDataForFramework = async (
  framework: Framework = 'vanilla',
) => {
  let frameworkPath;

  switch (framework) {
    case 'angular':
      frameworkPath = angularPath;
      break;
    case 'react':
      frameworkPath = reactPath;
      break;
    case 'vue':
      frameworkPath = vuePath;
      break;
    default:
      frameworkPath = componentStaticPath;
  }

  return getStructuredMetaData(frameworkPath);
};

/**
 * Get additional information about the usage of a specific framework in the Synergy Design System.
 * @param framework The framework to get information about
 * @returns List of structured metadata for the specified framework.
 */
export const getStaticMetaDataForFramework = async (
  framework: Framework = 'vanilla',
) => {
  const frameworkPath = framework === 'vanilla' ? 'components' : framework;
  return getStructuredMetaData(getAbsolutePath(`${staticPath}/${frameworkPath}`));
};

/**
 * Get additional information for a specific component from the static metadata.
 * @param component The name of the component to get information about, e.g., 'syn-button'.
 * @returns The structured metadata for the specified component, taken from the static metadata.
 */
const getAdditionalInformationForComponent = async (
  component: string,
) => getStructuredMetaDataForComponent(
  component,
  undefined,
  'static',
);

/**
 * Get information about the usage of a specific component in the Synergy Design System.
 * @param component The name of the component to get information about, e.g., 'syn-button'.
 * @param framework The framework to filter the component usage information by.
 * @returns The structured metadata for the specified component.
 */
export const getInfoForComponent = async (
  component: string,
  framework: Framework = 'vanilla',
) => {
  // Filter function to select specific files based on the framework
  const namePatterns = [
    'component.ts',
    'component.styles.ts',
    'component.custom.styles.ts',
  ];

  switch (framework) {
    case 'react':
      namePatterns.push('component.react.ts');
      break;
    case 'vue':
      namePatterns.push('component.vue');
      break;
    case 'angular':
      namePatterns.push('component.angular.ts');
      break;
    default:
  }

  const finalPattern = namePatterns.map(pattern => pattern.toLowerCase());
  const data = await getStructuredMetaDataForComponent(
    component,
    fileName => finalPattern.some(pattern => fileName.toLowerCase().includes(pattern)),
  );

  const additionalData = await getAdditionalInformationForComponent(component);

  return [
    ...data,
    ...additionalData,
  ].filter(Boolean);
};

/**
 * Get a list of all available components in the Synergy Design System.
 * @returns A list of all available components in the Synergy Design System.
 */
export const getAvailableComponents = async () => {
  const absolutePath = getAbsolutePath(`${componentPath}`);
  const folders = await fs.readdir(absolutePath, { withFileTypes: true });
  const components = folders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return components;
};
