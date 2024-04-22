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
  // (prev, section) => replaceSection(prev, ...section),
  (prev, section) => replaceSection(section, prev),
  initialContent,
);
