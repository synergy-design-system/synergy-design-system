/**
 * Cleanup middleware for MCP handler results.
 * Normalizes the raw entry array returned by handlers before any other
 * middleware inspects, transforms or serializes it.
 */
import type { ToolMiddleware } from './types.js';

/**
 * Middleware that removes optional (nullish) entries from a handler result.
 *
 * Handlers commonly build their result as a fixed tuple where some entries are
 * conditional, e.g. `[await getToolRule(name), data]`. When the optional entry
 * resolves to `undefined` (AI rules disabled via `includeAiRules`), it must not
 * reach downstream middleware: serializing it would produce a literal `"null"`
 * text entry that no longer looks empty to later filters.
 *
 * This middleware must be the innermost one in a stack so that every other
 * middleware only ever sees meaningful entries.
 */
export const withResultCleanupMiddleware: ToolMiddleware<Record<string, unknown>> = (
  next,
) => async (args) => {
  const result = await next(args);

  return result.filter(entry => entry !== null && entry !== undefined);
};
