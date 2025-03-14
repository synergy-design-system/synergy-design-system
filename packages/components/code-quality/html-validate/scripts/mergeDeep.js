/**
 * Creates a deep merged clone of the given objects.
 * @param  {...any} objects The objects to merge
 * @returns {object} The new object
 */
export const mergeDeep = (...objects) => {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      const accValue = acc[key];
      const objValue = obj[key];

      if (Array.isArray(objValue)) {
        acc[key] = Array.isArray(accValue) ? [...accValue, ...objValue] : [...objValue];
      } else if (isObject(objValue)) {
        acc[key] = isObject(accValue) ? mergeDeep(accValue, objValue) : { ...objValue };
      } else {
        acc[key] = objValue;
      }
    });

    return acc;
  }, {});
};
