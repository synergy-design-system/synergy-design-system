import type { ToolResponse } from '../types/tool-response.js';
import type { PromptResponse } from '../types/prompt-response.js';
import {
  type ToolMiddleware,
  type WithErrorHandlerOptions,
  composeMiddlewares,
  withCompressionMiddleware,
  withErrorHandlingMiddleware,
  withPromptLoggingMiddleware,
  withResourceCompressionMiddleware,
  withResourceLoggingMiddleware,
  withToolLoggingMiddleware,
} from '../middleware/index.js';
import { getRuntimeConfig } from './config.js';

/**
 * MetadataFile type representing a structured metadata file.
 */
export type MetadataFile = {
  content: string;
  filename: string;
};

/**
 * Creates a content array from an array of unknown data.
 * This is useful for converting raw data into a format that can be returned by MCP tools.
 * @param data The original data to convert into a content array. Each entry will be converted to a string if it is not already a string.
 * @returns Final content array
 */
export const toContentArray = (data: unknown[]): ToolResponse => {
  // First, we want to make sure that all entries in the array are strings, as the content array expects text content.
  const content = data
    .filter(Boolean)
    .map(entry => ({
      text: typeof entry === 'string' ? entry : JSON.stringify(entry),
      type: 'text' as const,
    }));

  return {
    content,
  };
};

const baseMiddlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
  withErrorHandlingMiddleware,
];

const toolMiddlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
  ...baseMiddlewareStack,
  withToolLoggingMiddleware,
  withCompressionMiddleware,
];

const promptMiddlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
  ...baseMiddlewareStack,
  withPromptLoggingMiddleware,
];

// Resources do not use withErrorHandlingMiddleware: errors should propagate
// naturally so the MCP SDK can surface them to the client correctly.
const resourceMiddlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
  withResourceCompressionMiddleware,
  withResourceLoggingMiddleware,
];

type PromptDescriptionResolver<TArgs extends Record<string, unknown>> =
  | string
  | ((args: TArgs) => string);

type PromptHandlerOptions<TArgs extends Record<string, unknown>> =
  WithErrorHandlerOptions & {
    description?: PromptDescriptionResolver<TArgs>;
  };

const executeWithMiddleware = <TArgs extends Record<string, unknown>>(
  name: string,
  handler: (args: TArgs) => Promise<unknown[]>,
  middlewareStack: ToolMiddleware<Record<string, unknown>>[],
  options: WithErrorHandlerOptions,
) => {
  const rawHandler = composeMiddlewares(
    async (rawArgs) => handler(rawArgs as TArgs),
    middlewareStack,
    {
      config: getRuntimeConfig(),
      options,
      toolName: name,
    },
  );

  return rawHandler;
};

const isPromptResponse = (value: unknown): value is PromptResponse => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybePrompt = value as Partial<PromptResponse>;
  return typeof maybePrompt.description === 'string' && Array.isArray(maybePrompt.messages);
};

const toPromptResponse = (value: unknown, promptName: string): PromptResponse => {
  if (isPromptResponse(value)) {
    return value;
  }

  return {
    description: `Result of ${promptName} prompt`,
    messages: [
      {
        content: {
          text: typeof value === 'string' ? value : JSON.stringify(value),
          type: 'text',
        },
        role: 'assistant',
      },
    ],
  };
};

const toPromptResponseFromEntries = <TArgs extends Record<string, unknown>>(
  data: unknown[],
  promptName: string,
  args: TArgs,
  options: PromptHandlerOptions<TArgs>,
): PromptResponse => {
  const description = typeof options.description === 'function'
    ? options.description(args)
    : options.description ?? `Result of ${promptName} prompt`;

  const messages = data
    .filter(Boolean)
    .map((entry) => ({
      content: {
        text: typeof entry === 'string' ? entry : JSON.stringify(entry),
        type: 'text' as const,
      },
      role: 'assistant' as const,
    }));

  return {
    description,
    messages,
  };
};

/**
 * Creates a transparent tool handler that keeps tool bodies focused on
 * business logic while applying logging and error handling consistently.
 */
export const toolHandler = <TArgs extends Record<string, unknown>>(
  toolName: string,
  handler: (args: TArgs) => Promise<unknown[]>,
  options: WithErrorHandlerOptions = {},
) => async (args: TArgs): Promise<ToolResponse> => {
  const rawHandler = executeWithMiddleware(
    toolName,
    handler,
    toolMiddlewareStack,
    options,
  );

  return toContentArray(await rawHandler(args));
};

/**
 * Creates a transparent prompt handler that keeps prompt bodies focused on
 * business logic while applying error handling consistently.
 *
 * Unlike toolHandler, promptHandler:
 * - Does not apply compression (prompts are already text-based messages)
 * - Returns PromptResponse directly instead of wrapping in ToolResponse
 * - Provides error handling that returns an error message in prompt format
 */
export const promptHandler = <TArgs extends Record<string, unknown>>(
  promptName: string,
  handler: (args: TArgs) => Promise<unknown[] | PromptResponse>,
  options: PromptHandlerOptions<TArgs> = {},
) => async (args: TArgs): Promise<PromptResponse> => {
  const promptErrorOptions: WithErrorHandlerOptions = {
    ...options,
    onError: async (error, context) => {
      if (options.onError) {
        return options.onError(error, context);
      }

      const suffix = context ? ` ${context}` : '';
      const message = error instanceof Error ? error.message : String(error);
      const errorText = `Error${suffix}: ${message}`;

      return [
        {
          description: `Error in ${promptName} prompt`,
          messages: [
            {
              content: {
                text: errorText,
                type: 'text',
              },
              role: 'assistant',
            },
          ],
        },
      ];
    },
  };

  const rawHandler = executeWithMiddleware(
    promptName,
    async (rawArgs) => {
      const result = await handler(rawArgs as TArgs);
      return isPromptResponse(result) ? [result] : result;
    },
    promptMiddlewareStack,
    promptErrorOptions,
  );

  const result = await rawHandler(args);

  if (result.length === 1) {
    return toPromptResponse(result[0], promptName);
  }

  return toPromptResponseFromEntries(result, promptName, args, options);
};

/**
 * Wraps a resource handler through the middleware pipeline (logging, and any
 * future cross-cutting concerns) while keeping resource implementations focused
 * on business logic.
 *
 * The URI is adapted into the middleware args shape as `{ uri: string }` and
 * unwrapped back to a URL before calling the inner handler.
 */
export const resourceHandler = <TResult>(
  resourceName: string,
  handler: (uri: URL) => Promise<TResult>,
) => async (uri: URL): Promise<TResult> => {
  const adaptedHandler = async (args: Record<string, unknown>): Promise<unknown[]> => {
    const result = await handler(new URL(args.uri as string));
    return [result];
  };

  const rawHandler = composeMiddlewares(
    adaptedHandler,
    resourceMiddlewareStack,
    {
      config: getRuntimeConfig(),
      options: {},
      toolName: resourceName,
    },
  );

  const result = await rawHandler({ uri: uri.toString() });
  return result[0] as TResult;
};
