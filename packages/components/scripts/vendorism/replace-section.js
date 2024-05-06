/**
 * Replace a section of content with a new section
 * @param {string[]} pair Tuple of search and replace strings
 * @param {*} content The content to run the replacement in
 * @returns {string} New content with replacements applied
 */
export const replaceSection = ([search, replace], content) => content.replaceAll(search, replace);

/**
 * Takes an array of section options and applies them via replaceSection one by one
 * @param {string[][]} sections The sections you want to replace
 * @param {string} initialContent The initial content
 * @returns {string} Output after all transforms ran
 */
export const replaceSections = (sections, initialContent) => sections.reduce(
  (prev, section) => replaceSection(section, prev),
  initialContent,
);

/**
 * Adds a section of content after a search string
 * @param {string} content The string to search in
 * @param {string} search The content to add the content after
 * @param {string} insert The value that should be inserted
 * @param {object} options List of options
 * @returns {string} New content
 */
export const addSectionAfter = (content, search, insert, options = {}) => {
  const {
    newslinesBeforeInsertion = 1,
    removePrecedingWhitespace = true,
  } = options;

  let output = insert;
  const index = content.indexOf(search);

  if (newslinesBeforeInsertion > 0) {
    output = new Array(newslinesBeforeInsertion).fill('\n').join('') + output;
  }

  if (removePrecedingWhitespace) {
    output = output.trimEnd();
  }

  return content.slice(0, index + search.length) + output + content.slice(index + search.length);
};
