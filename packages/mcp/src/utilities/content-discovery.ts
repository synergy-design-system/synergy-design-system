import {
  listStyles,
  listTemplates,
} from '@synergy-design-system/metadata';

export type CatalogRecoveryResult = {
  availableNames: string[];
  error: string;
  operationPerformed: false;
  recovery: {
    arguments: Record<string, never>;
    tool: 'styles-list' | 'template-list';
  };
  resource: 'synergy://styles/list' | 'synergy://templates/list';
  submittedValue: string;
};

const sortNames = (names: string[]): string[] => names.toSorted(
  (left, right) => left.localeCompare(right),
);

export const getAvailableStyleNames = async (): Promise<string[]> => {
  const response = await listStyles({
    includeLayerRefs: false,
    includeSources: false,
  });
  return sortNames(response.data.map((style) => style.name));
};

export const getAvailableTemplateNames = async (): Promise<string[]> => {
  const response = await listTemplates();
  return sortNames(response.data.map((template) => template.name));
};

export const buildStyleRecovery = async (
  submittedStyle: string,
  error: string,
): Promise<CatalogRecoveryResult> => ({
  availableNames: await getAvailableStyleNames(),
  error,
  operationPerformed: false,
  recovery: { arguments: {}, tool: 'styles-list' },
  resource: 'synergy://styles/list',
  submittedValue: submittedStyle,
});

export const buildTemplateRecovery = async (
  submittedTemplate: string,
  error: string,
): Promise<CatalogRecoveryResult> => ({
  availableNames: await getAvailableTemplateNames(),
  error,
  operationPerformed: false,
  recovery: { arguments: {}, tool: 'template-list' },
  resource: 'synergy://templates/list',
  submittedValue: submittedTemplate,
});
