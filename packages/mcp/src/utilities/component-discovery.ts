import { listComponents } from '@synergy-design-system/metadata';

export type ComponentRecoveryResult = {
  availableComponentNames: string[];
  error: string;
  operationPerformed: false;
  recovery: {
    arguments: Record<string, never>;
    tool: 'component-list';
  };
  resource: 'synergy://components/list';
  submittedComponent: string;
};

export const getAvailableComponentNames = async (cluster?: string): Promise<string[]> => {
  const response = await listComponents({
    cluster,
    includeLayerRefs: false,
    includeSources: false,
  });
  return response.data
    .map((component) => component.name)
    .toSorted((left, right) => left.localeCompare(right));
};

export const buildComponentRecovery = async (
  submittedComponent: string,
  error: string,
): Promise<ComponentRecoveryResult> => ({
  availableComponentNames: await getAvailableComponentNames(),
  error,
  operationPerformed: false,
  recovery: {
    arguments: {},
    tool: 'component-list',
  },
  resource: 'synergy://components/list',
  submittedComponent,
});
