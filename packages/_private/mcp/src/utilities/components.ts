import type { Framework } from './config.js';
import { getStructuredMetaDataForComponent } from './metadata.js';

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
  const namePatterns = ['README.md', 'component.ts'];

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
