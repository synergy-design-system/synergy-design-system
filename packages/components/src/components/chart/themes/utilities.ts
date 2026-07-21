const styleTokenCache = new Map<string, string>();

/**
 * Resolves a CSS custom property token to its computed value on the document body.
 * Results are cached per token
 *
 * @param token CSS custom property name, e.g. --syn-color-primary.
 * @returns Trimmed computed value or an empty string when the token is not defined.
 */
export const getRealStyleValue = (token: string): string => {
  if (styleTokenCache.has(token)) {
    return styleTokenCache.get(token)!;
  }
  const value = getComputedStyle(document.body).getPropertyValue(token).trim();
  const resolved = value || '';
  styleTokenCache.set(token, resolved);
  return resolved;
};

/**
 * Clears all cached style token values.
 * Call this when the page theme changes to prevent stale values from being returned.
 */
export const invalidateStyleTokenCache = (): void => {
  styleTokenCache.clear();
};

/**
 * Pre-fills the style token cache by reading matching custom properties in a single
 * getComputedStyle pass. Call once per theme to amortize the read cost across all
 * subsequent token accesses.
 *
 * @param target Element to read computed styles from. Defaults to document.body.
 * @param options.includeOnly Explicit list of token names to warm up. Takes precedence over prefix.
 * @param options.prefix Only cache tokens whose name starts with this string. Defaults to '--syn-'.
 * @returns Number of tokens written to the cache.
 */
export const warmupStyleTokenCache = (
  target: Element = document.body,
  options: { includeOnly?: string[]; prefix?: string } = {},
): number => {
  if (typeof window === 'undefined' || !target) {
    return 0;
  }
  const { includeOnly, prefix = '--syn-' } = options;
  const computed = getComputedStyle(target);
  let count = 0;

  if (includeOnly) {
    includeOnly.forEach((token) => {
      styleTokenCache.set(token, computed.getPropertyValue(token).trim() || '');
      count += 1;
    });
    return count;
  }

  for (let i = 0; i < computed.length; i += 1) {
    const name = computed.item(i);
    if (name.startsWith(prefix)) {
      styleTokenCache.set(name, computed.getPropertyValue(name).trim() || '');
      count += 1;
    }
  }
  return count;
};

/**
 * Resolves a CSS custom property token and parses the numeric part from the value.
 *
 * @param token CSS custom property name.
 * @returns Parsed floating-point number from the computed style value.
 */
export const getRealValueWithoutUnit = (token: string): number => {
  const value = getRealStyleValue(token);
  return parseFloat(value);
};

/**
 * Normalizes either a single value or an array into an array shape.
 *
 * @param value A single item or an array of items.
 * @returns The input as an array.
 */
export const normalizeArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

/**
 * Checks if an object has an own property for a given key.
 *
 * @param obj Object to inspect.
 * @param key Property key to check.
 * @returns True when the key exists as an own property.
 */
const checkKeyExists = (obj: Record<string, unknown>, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Ensures that a nested property path exists and applies a default value when the final key is missing.
 * Existing values are preserved.
 *
 * @param target Object that is read and potentially mutated.
 * @param keyPath Dot-separated key path, e.g. a.b.c.
 * @param value Default value to assign when the final key does not exist.
 */
export const setDefaultValueIfNotAvailable = (target: Record<string, unknown>, keyPath: string, value: unknown) => {
  const keys = keyPath.split('.');
  let currentObj: Record<string, unknown> = target;
  const finalKey = keys[keys.length - 1];

  keys.forEach((key) => {
    if (finalKey === key) {
      if (!checkKeyExists(currentObj, key)) {
        currentObj[key] = value;
      }
    } else {
      if (!checkKeyExists(currentObj, key)) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key] as Record<string, unknown>;
    }
  });
};
