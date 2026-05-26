import type { FrameworkProfile } from '../intermediate-representation/types.js';

const toPascalCase = (value: string): string => value
  .split('-')
  .filter(Boolean)
  .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
  .join('');

/**
 * Resolve the framework-specific render symbol for a Synergy component name.
 */
export const resolveFrameworkComponentName = (
  componentName: string,
  framework: FrameworkProfile,
): string => {
  if (!componentName.startsWith('syn-')) {
    return componentName;
  }

  const normalizedComponent = toPascalCase(componentName.replace(/^syn-/, ''));

  if (framework === 'react-wrapper') {
    return `Syn${normalizedComponent}`;
  }

  if (framework === 'vue') {
    return `SynVue${normalizedComponent}`;
  }

  return componentName;
};
