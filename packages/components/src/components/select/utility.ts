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
