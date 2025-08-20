import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { getPath } from '../jobs/shared.js';

/**
 * @typedef MetadataObject
 * @property {string} name - Metadata item name
 * @property {string} [description] - Metadata item description
 *
 * @typedef {{
 *   "@animation"?: Array<MetadataObject>
 *   "@event"?: Array<MetadataObject>
 *   "@slot"?: Array<MetadataObject>
 *   "@dependency"?: Array<MetadataObject>
 *   "@csspart"?: Array<MetadataObject>
 *   "@cssproperty"?: Array<MetadataObject>
 * }} Metadata
 * 
 */

/** @type {['@animation','@event','@slot','@dependency','@csspart','@cssproperty']} */
const SUPPORTED_JSDOC_TAGS = ['@animation','@event', '@slot', '@dependency', '@csspart', '@cssproperty'];


/**
 * Adds JSDoc annotations for a specific JSDoc tag to a component's class comment.
 *
 * This function searches for the JSDoc comment block that precedes a class definition
 * and inserts new metadata entries for the specified JSDoc tag. If entries for the tag
 * already exist, new entries are appended after the last existing entry. If no entries
 * exist, they are inserted at the end of the JSDoc comment.
 *
 * @param {string} content - The complete source code content of the component file
 * @param {SUPPORTED_JSDOC_TAGS[number]} jsDocTag - The JSDoc tag to add entries for (e.g., '@event', '@slot', '@csspart')
 * @param {Array<MetadataObject>} items - Array of metadata items to add as JSDoc entries
 *
 * @returns {string} The modified content with new JSDoc annotations added
 *
 * @example
 * // Adds event documentation to a component
 * const content = addJsDocAnnotations(
 *   componentCode,
 *   '@event',
 *   [{ name: 'syn-change', description: 'Fired when value changes' }]
 * );
 *
 */
const addJsDocAnnotations = (content, jsDocTag, items) => {
  // This regex captures the entire JSDoc block that precedes the class export
  const classRegex = /\/\*\*([\s\S]*?)\*\/\s*export\s+default\s+class\s+(\w+)/;
  const match = content.match(classRegex);

  if (!match) {
    return content;
  }

  const jsDocContent = match[1];

  const hasExistingEntries = jsDocContent.includes(jsDocTag);

  const annotationLines = items.map((item) => (
    item.description
      ? ` * ${jsDocTag} ${item.name} - ${item.description}`
      : ` * ${jsDocTag} ${item.name}`));

  if (hasExistingEntries) {
    // Find the last entry of this JSDoc tag and add new entries after it
    // This ensures all entries of the same type are grouped together
    // We escape the @ symbol to use it in regex and find the last occurrence
    const escapedMetadataType = jsDocTag.replace('@', '\\@');
    const lastEntryRegex = new RegExp(`.*${escapedMetadataType}[^\\n]*$`, 'gm');
    const lastEntryMatch = jsDocContent.match(lastEntryRegex);
    if (lastEntryMatch) {
      const lastEntryLine = lastEntryMatch[lastEntryMatch.length - 1];
      const newJsDocContent = jsDocContent.replace(
        lastEntryLine,
        `${lastEntryLine}\n${annotationLines.join('\n')}`,
      );
      return content.replace(jsDocContent, newJsDocContent);
    }
  }

  // If no existing entries, add at the end of the JSDoc comment
  const newJsDocContent = `${jsDocContent}*\n${annotationLines.join('\n')}\n `;
  return content.replace(jsDocContent, newJsDocContent);
};

/**
 * Transforms component source code by adding metadata as JSDoc annotations.
 *
 * This function processes a component file and enriches its JSDoc comment with
 * metadata from the provided metadata object. It supports multiple JSDoc tags
 * including events, slots, dependencies, CSS parts, and CSS properties.
 *
 * The function iterates through all supported JSDoc tags and adds any
 * corresponding metadata entries found in the metadata object.
 *
 * @param {string} path - The file path
 * @param {string} originalContent - The original source code content of the component
 * @param {Metadata} metadata - Object containing metadata organized by JSDoc tag types
 *
 * @returns
 *
 * @example
 * const metadata = {
 *   '@event': [{ name: 'syn-change', description: 'Emitted when value changes' }],
 *   '@slot': [{ name: 'default', description: 'The main content' }],
 *   '@csspart': [{ name: 'base' }]
 * };
 * const result = addMetadataContent('/path/to/component.ts', sourceCode, metadata);
 */
const addMetadataContent = (path, originalContent, metadata) => {
  let content = originalContent;

  SUPPORTED_JSDOC_TAGS.forEach((jsdocTag) => {
    if (metadata[jsdocTag] && Array.isArray(metadata[jsdocTag])) {
      content = addJsDocAnnotations(content, jsdocTag, metadata[jsdocTag]);
    }
  });

  return {
    content,
    path,
  };
};

/**
 * This function processes a component file and enriches its class JSDoc comment with
 * metadata (jsdoc tag annotations) from a corresponding metadata.json file.
 * The metadata includes events, slots, dependencies, CSS parts, and CSS custom properties.
 * It only processes files that are component files (*.component.ts) located in
 * the src/components/ directory.
 *
 * The function:
 * 1. Validates that the file is a component file in the correct directory
 * 2. Looks for a metadata.json file in the same directory as the component
 * 3. If found, reads and parses the metadata
 * 4. Applies the metadata as JSDoc annotations to the component's class comment
 *
 * If no metadata.json file exists or the file is not a component file,
 * the original content is returned unchanged.
 *
 * @param {string} path - The file path
 * @param {string} content - The original source code content of the file
 *
 * @returns {{content: string, path: string}} Object containing the processed content
 *   and original file path. If no processing was needed, returns the original content unchanged.
 */
export const addMetadataToComponents = (path, content) => {
  const output = { content, path };
  const file = path.split('/')[3];

  if (!path.includes('src/components/') || !file.includes('.component.ts')) {
    return output;
  }

  // Get absolute path to the components package root directory
  const componentsRoot = getPath('..');

  const metadataPath = path.replace(file, 'metadata.json');
  const fullMetadataPath = join(componentsRoot, metadataPath);

  // Check if a metadata.json file exists for this component
  if (existsSync(fullMetadataPath)) {
    try {
      /** @type {Metadata} */
      const metadata = JSON.parse(readFileSync(fullMetadataPath, 'utf-8'));
      return addMetadataContent(path, content, metadata);
    } catch (error) {
      console.error(`Failed to parse metadata file at ${fullMetadataPath}:`, error);
      return output;
    }
  }

  return output;
};
