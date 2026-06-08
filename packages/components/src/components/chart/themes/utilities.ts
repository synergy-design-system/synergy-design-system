export const getRealStyleValue = (token: string): string => {
  const computedStyles = getComputedStyle(document.body);
  const value = computedStyles.getPropertyValue(token).trim();
  return value || '';
};

export const getRealValueWithoutUnit = (token: string): number => {
  const value = getRealStyleValue(token);
  return parseFloat(value);
};

type MergeableObject = Record<string, unknown>;
const isMergeableObject = (value: unknown): value is MergeableObject => typeof value === 'object' && value !== null && !Array.isArray(value);
const isUnknownArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * Creates a deep merged clone of the given objects.
 * @param  {...any} objects The objects to merge
 * @returns {object} The new object
 */
export const deepMerge = (...objects: MergeableObject[]): MergeableObject => objects.reduce<MergeableObject>(
  (acc, obj) => {
    Object.keys(obj).forEach(key => {
      const accValue = acc[key];
      const objValue = obj[key];

      if (isUnknownArray(objValue)) {
        const existingValues = isUnknownArray(accValue) ? accValue : [];
        acc[key] = [...existingValues, ...objValue];
      } else if (isMergeableObject(objValue)) {
        acc[key] = isMergeableObject(accValue) ? deepMerge(accValue, objValue) : { ...objValue };
      } else {
        acc[key] = objValue;
      }
    });

    return acc;
  },
  {},
);
