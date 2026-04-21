import { logToolCall } from './logger.js';

/**
 * MetadataFile type representing a structured metadata file.
 */
export type MetadataFile = {
  content: string;
  filename: string;
};

export type ToolResponse = {
  content: {
    text: string;
    type: 'text';
  }[]
};

export type WithErrorHandlerOptions = {
  context?: string;
  onError?: (error: unknown, context?: string) => unknown[] | Promise<unknown[]>;
};

type RawToolHandler<TArgs extends Record<string, unknown>> = (args: TArgs) => Promise<unknown[]>;

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
 * Default error content generator for tool responses.
 * This can be used in the onError callback of withErrorHandler to provide a consistent error message format.
 * @param error - The error object that was thrown.
 * @param context - Optional context string to provide additional information about where the error occurred.
 * @returns An array of content objects suitable for MCP tool responses.
 */
const defaultErrorContent = (error: unknown, context?: string): unknown[] => {
  const suffix = context ? ` ${context}` : '';
  const message = error instanceof Error ? error.message : String(error);

  return [{
    text: `Error${suffix}: ${message}`,
    type: 'text',
  }];
};

/**
 * Wraps raw tool execution with fallback behavior.
 * Use this as middleware in the tool pipeline.
 * @param fn - Raw tool handler function.
 * @param options - Optional context and custom error fallback behavior.
 */
export const withErrorHandler = <TArgs extends Record<string, unknown>>(
  fn: RawToolHandler<TArgs>,
  options: WithErrorHandlerOptions = {},
) : RawToolHandler<TArgs> => async (args: TArgs) => {
  try {
    return await fn(args);
  } catch (error) {
    const fallback = options.onError
      ? await options.onError(error, options.context)
      : defaultErrorContent(error, options.context);

    return fallback;
  }
};

type WithToolCallLoggingInput = {
  parameters?: Record<string, unknown>;
  toolName: string;
};

type ToolMiddlewareContext = {
  options: WithErrorHandlerOptions;
  toolName: string;
};

type ToolMiddleware<TArgs extends Record<string, unknown>> = (
  next: RawToolHandler<TArgs>,
  context: ToolMiddlewareContext,
) => RawToolHandler<TArgs>;

const withToolLoggingMiddleware = <TArgs extends Record<string, unknown>>(
  next: RawToolHandler<TArgs>,
  context: ToolMiddlewareContext,
): RawToolHandler<TArgs> => async (args: TArgs) => {
  const startedAt = process.hrtime.bigint();
  let success = false;
  let errorMessage: string | undefined;

  try {
    const content = await next(args);
    success = true;
    return content;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    // MCP SDK may add internal context properties to the args object
    // (requestId, signal, requestInfo, sessionId). Create a new object
    // with only the non-internal properties for logging.
    const internalProps = new Set(['requestId', 'signal', 'requestInfo', 'sessionId']);
    const loggableParameters: Record<string, unknown> = {};

    Object.entries(args).forEach(([key, value]) => {
      if (!internalProps.has(key)) {
        loggableParameters[key] = value;
      }
    });

    await logToolCall({
      durationMs,
      errorMessage,
      parameters: loggableParameters,
      success,
      toolName: context.toolName,
    });
  }
};

const withErrorHandlingMiddleware = <TArgs extends Record<string, unknown>>(
  next: RawToolHandler<TArgs>,
  context: ToolMiddlewareContext,
): RawToolHandler<TArgs> => withErrorHandler(next, context.options);

const composeMiddlewares = <TArgs extends Record<string, unknown>>(
  handler: RawToolHandler<TArgs>,
  middlewares: ToolMiddleware<TArgs>[],
  context: ToolMiddlewareContext,
): RawToolHandler<TArgs> => middlewares
  .reduceRight((next, middleware) => middleware(next, context), handler);

/**
 * Wraps tool execution with unified error handling plus structured logging.
 * Use this wrapper in tool handlers so all tool calls emit consistent logs.
 */
export const withToolCallLogging = async (
  input: WithToolCallLoggingInput,
  fn: () => Promise<unknown[]>,
  options: WithErrorHandlerOptions = {},
): Promise<ToolResponse> => {
  const middlewareStack: ToolMiddleware<Record<string, unknown>>[] = [
    withErrorHandlingMiddleware,
    withToolLoggingMiddleware,
  ];

  const rawHandler = composeMiddlewares(
    async () => fn(),
    middlewareStack,
    {
      options,
      toolName: input.toolName,
    },
  );

  return toContentArray(await rawHandler(input.parameters ?? {}));
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
  const middlewareStack: ToolMiddleware<TArgs>[] = [
    withErrorHandlingMiddleware,
    withToolLoggingMiddleware,
  ];

  const rawHandler = composeMiddlewares(
    async (rawArgs: TArgs) => handler(rawArgs),
    middlewareStack,
    {
      options,
      toolName,
    },
  );

  return toContentArray(await rawHandler(args));
};
