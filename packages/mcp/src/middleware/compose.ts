/**
 * Middleware composition utility using reduceRight pattern.
 * This keeps middlewares flexible for reordering while maintaining clear
 * execution semantics (right-to-left composition, left-to-right execution).
 */
import type {
  RawToolHandler,
  ToolMiddleware,
  ToolMiddlewareContext,
} from './types.js';

/**
 * Applies an array of middlewares to a raw tool handler, returning a new handler with all middleware applied.
 * Middlewares are applied in right-to-left order, meaning the last middleware in the array will be the outermost wrapper around the handler.
 * @param handler The original raw tool handler function to wrap with middleware.
 * @param middlewares An array of middleware functions to apply to the handler.
 * @param context The context object to pass to each middleware, containing configuration and options.
 * @returns A new raw tool handler function with all middleware applied.
 */
export const composeMiddlewares = <TArgs extends Record<string, unknown>>(
  handler: RawToolHandler<TArgs>,
  middlewares: ToolMiddleware<TArgs>[],
  context: ToolMiddlewareContext,
): RawToolHandler<TArgs> => middlewares
  .reduceRight(
    (next, middleware) => middleware(next, context),
    handler,
  );
