import {
  type Tiktoken,
  type TiktokenEncoding,
} from 'tiktoken';
import type { ToolResponseContentEntry } from './metadata.js';

type TiktokenModule = typeof import('tiktoken');
type TokenEncoder = Tiktoken;

/**
 * Token counting utility for MCP.
 * Uses the tiktoken library to count tokens based on the o200k_base encoding.
 * If tiktoken is not available, token counting functions will return undefined.
 */
export const TOKEN_ENCODING: TiktokenEncoding = 'o200k_base';

export type TextContentEntry = ToolResponseContentEntry;

const hasGetEncoding = (
  module: unknown,
): module is Pick<TiktokenModule, 'get_encoding'> => {
  if (typeof module !== 'object' || module === null) {
    return false;
  }

  return (
    'get_encoding' in module
    && typeof (module as { get_encoding?: unknown }).get_encoding === 'function'
  );
};

let encoderPromise: Promise<TokenEncoder | null> | undefined;

const loadEncoder = async (): Promise<TokenEncoder | null> => {
  if (!encoderPromise) {
    encoderPromise = (async () => {
      try {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const module = await import('tiktoken');
        if (!hasGetEncoding(module)) {
          return null;
        }

        return module.get_encoding(TOKEN_ENCODING);
      } catch {
        return null;
      }
    })();
  }

  return encoderPromise;
};

/**
 * Normalizes MCP text entries to a single payload string used for token counting.
 */
export const toTextPayload = (content: TextContentEntry[]): string => content
  .map(entry => entry.text)
  .join('\n\n');

export const countTextTokens = async (text: string): Promise<number | undefined> => {
  if (text.length === 0) {
    return 0;
  }

  const encoder = await loadEncoder();
  if (!encoder) {
    return undefined;
  }

  try {
    return encoder.encode(text).length;
  } catch {
    return undefined;
  }
};
