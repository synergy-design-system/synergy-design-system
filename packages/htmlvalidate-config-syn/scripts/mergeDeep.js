/**
 * Creates a deep merged clone of the given objects.
 * @param  {...any} objects The objects to merge
 * @returns {object} The new object
 */
export const mergeDeep = (...objects) => Array
  .from(objects)
  .reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      acc[key] = Array.isArray(value) ? value : { ...acc[key], ...value };
    });
    return acc;
  }, {});
