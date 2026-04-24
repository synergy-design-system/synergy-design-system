/**
 * Error handling middleware for tool execution.
 * Wraps handler with try/catch to provide consistent fallback behavior.
 */
import type {
  RawToolHandler,
  ToolMiddleware,
  WithErrorHandlerOptions,
} from './types.js';

/**
 * Default error content generator for tool responses.
 * This can be used in the onError callback of withErrorHandler to provide a consistent error message format.
 * @param error - The error object that was thrown.
 * @param context - Optional context string to provide additional information about where the error occurred.
 * @returns An array of content objects suitable for MCP tool responses.
 */
const defaultErrorContent = (
  error: unknown,
  context?: string,
): unknown[] => {
  const suffix = context ? ` ${context}` : '';
  const message = error instanceof Error ? error.message : String(error);

  return [
    {
      text: `Error${suffix}: ${message}`,
      type: 'text',
    },
  ];
};

/**
 * Wraps raw tool execution with fallback behavior.
 * Use this as middleware in the tool pipeline.
 * @param fn - Raw tool handler function.
 * @param options - Optional context and custom error fallback behavior.
 */
const withErrorHandler = <TArgs extends Record<string, unknown>>(
  fn: RawToolHandler<TArgs>,
  options: WithErrorHandlerOptions = {},
): RawToolHandler<TArgs> => async (args: TArgs) => {
  try {
    return await fn(args);
  } catch (error) {
    const fallback = options.onError
      ? await options.onError(error, options.context)
      : defaultErrorContent(error, options.context);

    return fallback;
  }
};

/**
 * Middleware that applies error handling to tool execution, using the withErrorHandler function to wrap the next handler in the chain.
 * This ensures that any errors thrown during tool execution are caught and handled according to the provided options or default behavior.
 * @param next The next handler in the middleware chain, which executes the actual tool logic.
 * @param context The middleware context, containing configuration and options for error handling.
 * @returns A new handler function that wraps the original tool logic with error handling functionality.
 */
export const withErrorHandlingMiddleware: ToolMiddleware<Record<string, unknown>> = (
  next,
  context,
) => withErrorHandler(next, context.options);
