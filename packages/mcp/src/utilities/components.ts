import fs from 'node:fs/promises';
import {
  type Framework,
  componentPath,
  staticPath,
} from './config.js';
import { getAbsolutePath } from './file.js';
import {
  getStructuredMetaData,
  getStructuredMetaDataForComponent,
} from './metadata.js';

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
    'docs.md',
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

  return data;
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
