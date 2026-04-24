/**
 * Middleware pipeline types and contracts.
 */

import type { McpRuntimeConfig } from '../utilities/config.js';

export type RawToolHandler<TArgs extends Record<string, unknown>> = (
  args: TArgs,
) => Promise<unknown[]>;

export type ToolMiddlewareContext = {
  config: McpRuntimeConfig;
  options: WithErrorHandlerOptions;
  toolName: string;
};

/**
 * ToolMiddleware defines the shape of middleware functions that can be applied to tool handlers.
 * Each middleware receives the next handler in the chain and a context object, and returns a new handler function.
 * This allows for flexible composition of cross-cutting concerns like logging, error handling, and more.
 */
export type ToolMiddleware<TArgs extends Record<string, unknown>> = (
  next: RawToolHandler<TArgs>,
  context: ToolMiddlewareContext,
) => RawToolHandler<TArgs>;

export type WithErrorHandlerOptions = {
  context?: string;
  onError?: (
    error: unknown,
    context?: string,
  ) => unknown[] | Promise<unknown[]>;
};
