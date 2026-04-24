import type { ToolResponse } from '../types/tool-response.js';
import {
  type ToolMiddleware,
  type WithErrorHandlerOptions,
  composeMiddlewares,
  withErrorHandlingMiddleware,
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

/**
 * Creates a transparent tool handler that keeps tool bodies focused on
 * business logic while applying logging and error handling consistently.
 */
export const toolHandler = <TArgs extends Record<string, unknown>>(
  toolName: string,
  handler: (args: TArgs) => Promise<unknown[]>,
  options: WithErrorHandlerOptions = {},
) => async (args: TArgs): Promise<ToolResponse> => {
  const middlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
    withErrorHandlingMiddleware,
    withToolLoggingMiddleware,
  ];

  // Middlewares treat args opaquely as Record<string, unknown>; cast at the boundary.
  const rawHandler = composeMiddlewares(
    async (rawArgs) => handler(rawArgs as TArgs),
    middlewareStack,
    {
      config: getRuntimeConfig(),
      options,
      toolName,
    },
  );

  return toContentArray(await rawHandler(args));
};
