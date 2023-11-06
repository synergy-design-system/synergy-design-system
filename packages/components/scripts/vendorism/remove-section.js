function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape special characters
}

const generatePrimaryRegex = (start, end, removePrecedingWhitespace) => {
  const escapedStart = escapeRegExp(start);
  const escapedEnd = escapeRegExp(end);

  if (removePrecedingWhitespace) {
    return new RegExp(`\\n?[\\t\\s]*${escapedStart}[\\s\\S]*?${escapedEnd}`, 'gm');
  }
  return new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`, 'gm');
};

/**
 * Removes a section of text from a string.
 *
 * @param {string} input
 * @param {string} start
 * @param {string} end
 * @param {object} options
 * @param {boolean=} options.removePrecedingWhitespace
 * @param {boolean=} options.preserveEnd
 * @param {boolean=} options.preserveStart
 * @returns {string}
 */

export const removeSection = (input, start, end, options = {}) => {
  const {
    removePrecedingWhitespace = true,
    preserveEnd = false,
    preserveStart = false,
  } = options;

  let replacement = '';

  if (preserveStart) {
    replacement += start;
  }

  if (preserveEnd) {
    replacement += end;
  }

  const result = input.replace(
    generatePrimaryRegex(start, end, removePrecedingWhitespace),
    replacement,
  );

  return result;
};
