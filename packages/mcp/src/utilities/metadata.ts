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
 * Wraps tool execution and converts both success and fallback content into MCP ToolResponse.
 * Use this in tool handlers to avoid repeating local try/catch blocks.
 * @param fn - Function that returns raw content entries for toContentArray.
 * @param options - Optional context and custom error fallback behavior.
 */
export const withErrorHandler = async (
  fn: () => Promise<unknown[]>,
  options: WithErrorHandlerOptions = {},
): Promise<ToolResponse> => {
  try {
    const content = await fn();
    return toContentArray(content);
  } catch (error) {
    const fallback = options.onError
      ? await options.onError(error, options.context)
      : defaultErrorContent(error, options.context);

    return toContentArray(fallback);
  }
};
