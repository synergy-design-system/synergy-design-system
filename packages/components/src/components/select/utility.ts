/**
 * Valid types of inputs
 */
type AllowedValueTypes = string | number | Array<string | number>;

/**
 * Check if a given value is allowed
 * @param value The value to check for
 * @returns True if the type is allowed, false otherwise
 */
export const isAllowedValue = (value: AllowedValueTypes) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'string') {
    return value.length > 0;
  }

  if (typeof value === 'number') {
    return true;
  }

  return !!value;
};

/**
 * Compare two values if they are equal
 * @param a The first value to compare
 * @param b The second value to compare
 * @returns True if the values are equal, false otherwise
 */
export const compareValues = (a: AllowedValueTypes, b: AllowedValueTypes) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((v, i) => v === b[i]);
  }
  return a === b;
};

/**
 * Check if a value is truthy
 * @param value The value to check
 * @returns True if the value is truthy, false otherwise
 */
export const isTruthy = (value: unknown) => typeof value !== 'undefined' && value !== null && value !== false && value !== '';
