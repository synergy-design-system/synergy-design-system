/**
 * Logging middleware for tool execution.
 * Records tool call duration, token count, success/error state, and parameters.
 * Respects logging config: early-exits if logging is disabled to avoid token counting overhead.
 */

import { logToolCall } from '../utilities/logger.js';
import {
  countTextTokens,
  toTextPayload,
} from '../utilities/token-counter.js';
import { toContentArray } from '../utilities/metadata.js';
import type {
  ToolMiddleware,
} from './types.js';

/**
 * Middleware that logs details about tool execution, including duration, success/failure, token count, and parameters.
 * It checks the logging configuration and skips logging (and token counting) if logging is disabled to optimize performance.
 * @param next The next handler in the middleware chain, which executes the actual tool logic.
 * @param context The middleware context, containing configuration and options for logging.
 * @returns A new handler function that wraps the original tool logic with logging functionality.
 */
export const withToolLoggingMiddleware: ToolMiddleware<Record<string, unknown>> = (
  next,
  context,
) => async (args) => {
  // Early exit if logging is not enabled to avoid token counting overhead.
  if (context.config.logging.localFile.path === null) {
    return next(args);
  }

  const startedAt = process.hrtime.bigint();
  let success = false;
  let errorMessage: string | undefined;
  let tokenCount: number | undefined;

  try {
    const content = await next(args);
    success = true;

    // Normalize to ToolResponse content before token counting so metrics match the final response shape.
    // This keeps logging robust even if middleware order changes later.
    const textPayload = toTextPayload(toContentArray(content).content);
    tokenCount = await countTextTokens(textPayload);

    return content;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    // MCP SDK may add internal context properties to the args object
    // (requestId, signal, requestInfo, sessionId). Create a new object
    // with only the non-internal properties for logging.
    const internalProps = new Set([
      'requestId',
      'signal',
      'requestInfo',
      'sessionId',
    ]);
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
      tokenCount,
      toolName: context.toolName,
    });
  }
};
