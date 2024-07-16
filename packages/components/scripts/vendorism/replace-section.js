/* eslint-disable max-len */
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
 * @param { {newlinesBeforeInsertion: number, removePrecedingWhitespace: boolean, tabsBeforeInsertion: number}} options
 *  List of options
 * @returns {string} New content
 */
export const addSectionAfter = (content, search, insert, options = {}) => {
  const {
    newlinesBeforeInsertion = 1,
    removePrecedingWhitespace = true,
    tabsBeforeInsertion = 0,
  } = options;

  let output = insert;
  const index = content.indexOf(search);

  let additions = '';

  if (newlinesBeforeInsertion > 0) {
    additions += new Array(newlinesBeforeInsertion).fill('\n').join('');
  }

  if (tabsBeforeInsertion > 0) {
    additions += new Array(tabsBeforeInsertion).fill('\t').join('');
  }

  output = additions + output;
  if (removePrecedingWhitespace) {
    output = output.trimEnd();
  }

  return content.slice(0, index + search.length) + output + content.slice(index + search.length);
};

/**
 * Takes an array of section options and applies them via addSectionAfter one by one
 * @param {array} sections The sections you want to replace
 * @param {string} initialContent The initial content
 * @returns {string} Output after all transforms ran
 */
export const addSectionsAfter = (sections, initialContent) => sections.reduce(
  (prev, options) => addSectionAfter(prev, ...options),
  initialContent,
);

/**
 * Adds a section of content after a search string
 * @param {string} content The string to search in
 * @param {string} search The content to add the content before
 * @param {string} insert The value that should be inserted
 * @param { {newlinesAfterInsertion: number, tabsAfterInsertion: number}} options
 *  List of options
 * @returns {string} New content
 */
export const addSectionBefore = (content, search, insert, options = {}) => {
  const {
    newlinesAfterInsertion = 1,
    tabsAfterInsertion = 0,
  } = options;

  let output = insert;
  const index = content.indexOf(search);

  if (newlinesAfterInsertion > 0) {
    output += new Array(newlinesAfterInsertion).fill('\n').join('');
  }

  if (tabsAfterInsertion > 0) {
    output += new Array(tabsAfterInsertion).fill('\t').join('');
  }

  return content.slice(0, index) + output + content.slice(index);
};

/**
 * Takes an array of section options and applies them via addSectionBefore one by one
 * @param {array} sections The sections you want to replace
 * @param {string} initialContent The initial content
 * @returns {string} Output after all transforms ran
 */
export const addSectionsBefore = (sections, initialContent) => sections.reduce(
  (prev, options) => addSectionBefore(prev, ...options),
  initialContent,
);
