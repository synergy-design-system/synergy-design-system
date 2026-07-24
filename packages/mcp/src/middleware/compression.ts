/**
 * Compression middleware for MCP tool responses.
 * Encodes structured data (objects, arrays) into toon format when enabled.
 * String entries (like AI rules) pass through unchanged.
 */

import { encodeToToon } from '../utilities/compression.js';
import type { ToolMiddleware } from './types.js';

type MiddlewareResultEntry = unknown;
type MiddlewareResult = MiddlewareResultEntry[];
type EntryTransformer = (entry: MiddlewareResultEntry) => Promise<MiddlewareResultEntry>;

const transformResultEntries = async (
  result: MiddlewareResult,
  transform: EntryTransformer,
): Promise<MiddlewareResult> => Promise.all(result.map(transform));

const createCompressionMiddleware = (
  transform: EntryTransformer,
): ToolMiddleware<Record<string, unknown>> => (next, context) => async (args) => {
  const result = await next(args);

  return context.config.compression === 'toon'
    ? transformResultEntries(result, transform)
    : result;
};

const transformToolEntry: EntryTransformer = async (entry) => {
  // Strings (e.g., AI rules prefix) pass through unchanged
  if (typeof entry === 'string') {
    return entry;
  }

  // Non-strings get encoded to toon format
  return encodeToToon(entry);
};

const transformResourceEntry: EntryTransformer = async (entry) => {
  if (!entry || typeof entry !== 'object') {
    return entry;
  }

  const maybeResourceResult = entry as {
    contents?: Array<Record<string, unknown>>;
  };

  if (!Array.isArray(maybeResourceResult.contents)) {
    return entry;
  }

  const nextContents = await Promise.all(
    maybeResourceResult.contents.map(async (content) => {
      const { text } = content;
      if (typeof text !== 'string') {
        return content;
      }

      try {
        const parsed: unknown = JSON.parse(text);
        const compressedText = await encodeToToon(parsed);
        return {
          ...content,
          text: compressedText,
        };
      } catch {
        return content;
      }
    }),
  );

  return {
    ...maybeResourceResult,
    contents: nextContents,
  };
};

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
export const withCompressionMiddleware = createCompressionMiddleware(transformToolEntry);

/**
 * Middleware that compresses resource read payloads using toon format encoding.
 *
 * Resource handlers return MCP read-resource results in the form:
 * `{ contents: [{ ..., text: string }] }`.
 *
 * When `compression` is set to `'toon'`, each `contents[].text` entry is
 * converted from pretty JSON text to toon-encoded text where possible.
 *
 * If parsing fails for an entry (non-JSON text), that entry is left unchanged.
 */
export const withResourceCompressionMiddleware = createCompressionMiddleware(transformResourceEntry);
