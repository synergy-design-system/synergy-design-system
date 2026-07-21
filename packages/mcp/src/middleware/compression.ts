/**
 * Compression middleware for MCP tool responses.
 * Encodes structured data (objects, arrays) into toon format when enabled.
 * String entries (like AI rules) pass through unchanged.
 */

import { encodeToToon } from '../utilities/compression.js';
import type { ToolMiddleware } from './types.js';

/**
 * Middleware that compresses tool response payloads using toon format encoding.
 *
 * When `compression` is set to `'toon'`, non-string entries in the tool response
 * are encoded to a compact toon text format. String entries (e.g., AI rules prefix)
 * pass through unchanged. This reduces response size significantly for structured data.
 *
 * When `compression` is `'none'` or unavailable, responses pass through unmodified.
 *
 * This middleware should run before the logging middleware so that token counts
 * reflect the compressed payload size.
 */
export const withCompressionMiddleware: ToolMiddleware<Record<string, unknown>> = (next, context) => async (args) => {
  const result = await next(args);

  // Early exit if compression is disabled
  if (!context.config.compression || context.config.compression === 'none') {
    return result;
  }

  // Compression mode is 'toon': process each entry
  const compressed = await Promise.all(
    result.map(async (entry) => {
      // Strings (e.g., AI rules prefix) pass through unchanged
      if (typeof entry === 'string') {
        return entry;
      }

      // Non-strings get encoded to toon format
      return encodeToToon(entry);
    }),
  );

  return compressed;
};
