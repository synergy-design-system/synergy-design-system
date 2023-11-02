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

const removeLinesBeforeTarget = (input, start, count) => {
  const beforeRegex = new RegExp(`(?:.*\\n){0,${count}}(?=${escapeRegExp(start)})`, 'g');
  return input.replace(beforeRegex, '');
};

const removeLinesAfterTarget = (input, end, count) => {
  const afterRegex = new RegExp(`(?<=${escapeRegExp(end)})(?:.*\\n){0,${count}}`, 'g');
  return input.replace(afterRegex, '');
};

/**
 * Removes a section of text from a string.
 *
 * @param {string} input
 * @param {string} start
 * @param {string} end
 * @param {object} options
 * @param {boolean=} options.removePrecedingWhitespace
 * @param {number=} options.removeLinesBefore
 * @param {number=} options.removeLinesAfter
 * @param {boolean=} options.preserveEnd
 * @param {boolean=} options.preserveStart
 * @returns {string}
 */

export const removeSection = (input, start, end, options = {}) => {
  const {
    removePrecedingWhitespace = true,
    removeLinesBefore = 0,
    removeLinesAfter = 0,
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

  let result = input.replace(
    generatePrimaryRegex(start, end, removePrecedingWhitespace),
    replacement,
  );

  result = removeLinesBeforeTarget(result, start, removeLinesBefore);
  result = removeLinesAfterTarget(result, end, removeLinesAfter);

  return result;
};
