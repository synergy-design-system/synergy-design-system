/**
 * Compression utility for MCP tool responses.
 * Uses the @toon-format/toon library to encode structured data into a compact text format.
 * If the toon package is not available, compression is gracefully skipped.
 */
type ToonModule = typeof import('@toon-format/toon');

const hasToonEncode = (
  module: unknown,
): module is Pick<ToonModule, 'encode'> => {
  if (typeof module !== 'object' || module === null) {
    return false;
  }

  return (
    'encode' in module
    && typeof (module as { encode?: unknown }).encode === 'function'
  );
};

let encoderPromise: Promise<ToonModule['encode'] | null> | undefined;

/**
 * Loads the toon encoder from the optional @toon-format/toon dependency.
 * If the package is not available, returns null.
 * @returns The toon.encode function, or null if unavailable
 */
const loadEncoder = async (): Promise<ToonModule['encode'] | null> => {
  if (!encoderPromise) {
    encoderPromise = (async () => {
      try {
        const module = await import('@toon-format/toon');
        if (!hasToonEncode(module)) {
          return null;
        }

        return module.encode;
      } catch {
        // Package not installed or import failed
        return null;
      }
    })();
  }

  return encoderPromise;
};

/**
 * Encodes an unknown value using toon format.
 * Returns the original value as JSON string if toon is unavailable.
 * @param value The value to encode
 * @returns The encoded toon format string, or JSON stringified value if encoder unavailable
 */
export const encodeToToon = async (value: unknown): Promise<string> => {
  const encoder = await loadEncoder();

  if (!encoder) {
    // Graceful fallback: return as JSON
    return JSON.stringify(value);
  }

  return encoder(value);
};
