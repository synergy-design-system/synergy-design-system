import { getExample, listExamples } from '@synergy-design-system/metadata';
import type { ExampleKind, PublicError } from '@synergy-design-system/metadata';
import { buildComponentRecovery } from './component-discovery.js';
import { buildStyleRecovery, buildTemplateRecovery } from './content-discovery.js';

const names: Record<ExampleKind, { argument: string; examples: string }> = {
  component: { argument: 'component', examples: 'component-list-examples' },
  style: { argument: 'style', examples: 'styles-list-examples' },
  template: { argument: 'template', examples: 'template-list-examples' },
};

const catalogRecoveryBuilders: Record<ExampleKind, (name: string, error: string) => Promise<unknown>> = {
  component: buildComponentRecovery,
  style: buildStyleRecovery,
  template: buildTemplateRecovery,
};

const buildMissingExampleError = (
  kind: ExampleKind,
  name: string,
  message: string,
  availableExampleIds?: string[],
) => ({
  error: message,
  operationPerformed: false,
  ...(availableExampleIds ? { availableExampleIds } : {}),
  recovery: { arguments: { [names[kind].argument]: name }, tool: names[kind].examples },
});

const exampleError = async (
  kind: ExampleKind,
  name: string,
  error: PublicError | undefined,
  availableExampleIds?: string[],
): Promise<unknown> => {
  const message = error?.message ?? `Examples are unavailable for ${kind} "${name}".`;
  if (error?.code === 'NOT_FOUND' && error.details?.exampleId === undefined) {
    return catalogRecoveryBuilders[kind](name, message);
  }

  if (error?.details?.exampleId !== undefined) {
    return buildMissingExampleError(kind, name, message, availableExampleIds);
  }

  return { error: message, operationPerformed: false };
};

export const listEntityExamples = async (kind: ExampleKind, name: string): Promise<unknown> => {
  const response = await listExamples(kind, name);
  if (!response.data) {
    return exampleError(kind, name, response.errors?.[0]);
  }
  return {
    examples: response.data.map(({ description, id, title }) => ({ description, id, title })),
    [names[kind].argument]: name,
  };
};

export const getEntityExample = async (kind: ExampleKind, name: string, exampleId: string): Promise<unknown> => {
  const response = await getExample(kind, name, exampleId);
  if (response.data) return response.data.content;
  const error = response.errors?.[0];
  if (error?.details?.exampleId !== undefined) {
    const examples = await listExamples(kind, name);
    return exampleError(kind, name, error, examples.data?.map(({ id }) => id));
  }
  return exampleError(kind, name, error);
};
