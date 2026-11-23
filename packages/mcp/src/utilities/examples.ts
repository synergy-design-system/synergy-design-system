import { getExample, listExamples } from '@synergy-design-system/metadata';
import type { ExampleKind, PublicError } from '@synergy-design-system/metadata';

const names: Record<ExampleKind, { argument: string; catalog: string; examples: string }> = {
  component: { argument: 'component', catalog: 'component-list', examples: 'component-list-examples' },
  style: { argument: 'style', catalog: 'styles-list', examples: 'styles-list-examples' },
  template: { argument: 'template', catalog: 'template-list', examples: 'template-list-examples' },
};

const exampleError = (kind: ExampleKind, name: string, error: PublicError | undefined): unknown => {
  const result: {
    error: string;
    operationPerformed: false;
    recovery?: { arguments: Record<string, string>; tool: string };
  } = {
    error: error?.message ?? `Examples are unavailable for ${kind} "${name}".`,
    operationPerformed: false,
  };
  if (error?.details?.exampleId !== undefined) {
    result.recovery = { arguments: { [names[kind].argument]: name }, tool: names[kind].examples };
  } else if (error?.code === 'NOT_FOUND') {
    result.recovery = { arguments: {}, tool: names[kind].catalog };
  }
  return result;
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
  return exampleError(kind, name, response.errors?.[0]);
};
