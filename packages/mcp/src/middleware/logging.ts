/**
 * Logging middleware for tool execution.
 * Records tool call duration, token count, success/error state, and parameters.
 * Respects logging config: early-exits if logging is disabled to avoid token counting overhead.
 */
import { logOperation } from '../utilities/logger.js';
import { isAnyLoggingEnabled } from '../utilities/config.js';
import {
  countTextTokens,
  toTextPayload,
} from '../utilities/token-counter.js';
import type { PromptResponse } from '../types/prompt-response.js';
import type {
  ToolMiddleware,
} from './types.js';

const isPromptResponse = (value: unknown): value is PromptResponse => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybePrompt = value as Partial<PromptResponse>;
  return typeof maybePrompt.description === 'string' && Array.isArray(maybePrompt.messages);
};

const toPromptTextPayload = (result: unknown[]): string => {
  const lines = result.flatMap((entry) => {
    if (typeof entry === 'string') {
      return [entry];
    }

    if (isPromptResponse(entry)) {
      return entry.messages
        .map(message => {
          if (message.content.type === 'text') return message.content.text;
          return '';
        })
        .filter(Boolean);
    }

    return [JSON.stringify(entry)];
  });

  return lines.join('\n\n');
};

const toToolTextPayload = (result: unknown[]): string => {
  const textEntries = result
    .filter(Boolean)
    .map(entry => ({
      text: typeof entry === 'string' ? entry : JSON.stringify(entry),
      type: 'text' as const,
    }));

  return toTextPayload(textEntries);
};

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
  if (!isAnyLoggingEnabled(context.config)) {
    return next(args);
  }

  const startedAt = process.hrtime.bigint();
  let success = false;
  let errorMessage: string | undefined;
  let tokenCount: number | undefined;

  try {
    const content = await next(args);
    success = true;

    // Normalize to ToolResponse-like text content before token counting so metrics
    // match the final response shape even if middleware order changes later.
    const textPayload = toToolTextPayload(content);
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

    await logOperation({
      durationMs,
      errorMessage,
      kind: 'tool',
      name: context.toolName,
      parameters: loggableParameters,
      success,
      tokenCount,
    });
  }
};

/**
 * Middleware that logs prompt execution details.
 * Token counting is based on the resolved prompt text payload.
 */
export const withPromptLoggingMiddleware: ToolMiddleware<Record<string, unknown>> = (
  next,
  context,
) => async (args) => {
  if (!isAnyLoggingEnabled(context.config)) {
    return next(args);
  }

  const startedAt = process.hrtime.bigint();
  let success = false;
  let errorMessage: string | undefined;
  let tokenCount: number | undefined;

  try {
    const result = await next(args);
    success = true;

    const textPayload = toPromptTextPayload(result);
    tokenCount = await countTextTokens(textPayload);

    return result;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
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

    await logOperation({
      durationMs,
      errorMessage,
      kind: 'prompt',
      name: context.toolName,
      parameters: loggableParameters,
      success,
      tokenCount,
    });
  }
};
