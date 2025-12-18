import type { ComponentNamesWithDefaultValues } from './base.js';

/**
 * Component update priority and dependencies
 * Lower priority numbers update first, higher numbers update last
 */
const COMPONENT_UPDATE_ORDER: Partial<Record<ComponentNamesWithDefaultValues, {
  priority: number;
  dependsOn?: ComponentNamesWithDefaultValues[];
}>> = {
  // Container components that depend on base components update last
  SynButtonGroup: {
    dependsOn: ['SynButton'],
    priority: 10,
  },
  SynRadioGroup: {
    dependsOn: ['SynRadio'],
    priority: 10,
  },
} as const;

/**
 * Get priority for a component (defaults to 5 if not specified)
 */
export const getComponentPriority = (
  component: ComponentNamesWithDefaultValues,
) => COMPONENT_UPDATE_ORDER[component]?.priority ?? 5;

/**
 * Sort components by dependencies and priority
 */
export const sortComponentsForUpdate = (
  components: ComponentNamesWithDefaultValues[],
): ComponentNamesWithDefaultValues[] => {
  const visited = new Set<ComponentNamesWithDefaultValues>();
  const visiting = new Set<ComponentNamesWithDefaultValues>();
  const result: ComponentNamesWithDefaultValues[] = [];

  const visit = (component: ComponentNamesWithDefaultValues) => {
    if (visiting.has(component)) {
      // Skip circular dependencies
      return;
    }
    if (visited.has(component)) {
      return;
    }

    visiting.add(component);

    // Visit dependencies first
    const config = COMPONENT_UPDATE_ORDER[component];
    if (config?.dependsOn) {
      config.dependsOn.forEach(dep => {
        if (components.includes(dep)) {
          visit(dep);
        }
      });
    }

    visiting.delete(component);
    visited.add(component);
    result.push(component);
  };

  // Start with components sorted by priority, then apply dependency sorting
  const sortedByPriority = [...components].sort(
    (a, b) => getComponentPriority(a) - getComponentPriority(b),
  );

  sortedByPriority.forEach(component => visit(component));

  return result;
};
