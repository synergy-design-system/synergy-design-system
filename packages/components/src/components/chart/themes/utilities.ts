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
