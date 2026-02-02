import { writeFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { globby } from 'globby';
import { getPath, job, optimizePathForWindows } from '../shared.js';

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

  // Check which items already exist in the JSDoc
  const escapedJsDocTag = jsDocTag.replace('@', '\\@');
  // Updated regex to properly capture names with hyphens and other characters
  const existingRegex = new RegExp(`\\*\\s*${escapedJsDocTag}\\s+([^\\s]+)`, 'g');

  // Use matchAll to get all matches and extract the names functionally
  const existingEntries = new Set(
    Array.from(jsDocContent.matchAll(existingRegex))
      .map(m => m[1].trim()),
  );

  // Filter out items that already exist
  const newItems = items.filter(item => !existingEntries.has(item.name));

  // If no new items to add, return original content
  if (newItems.length === 0) {
    return content;
  }

  const hasExistingEntries = jsDocContent.includes(jsDocTag);
  const annotationLines = newItems.map((item) => (
    item.description
      ? ` * ${jsDocTag} ${item.name} - ${item.description}`
      : ` * ${jsDocTag} ${item.name}`));

  if (hasExistingEntries) {
    // Find the last entry of this JSDoc tag and add new entries after it
    const lastEntryRegex = new RegExp(`.*${escapedJsDocTag}[^\\n]*$`, 'gm');
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
 * @returns {{content: string, path: string}} Object containing the processed content and path
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
const addMetadataToComponents = (path, content) => {
  const output = { content, path };
  const file = path.split('/').at(-1);

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

/**
 * Build job that processes all component files and adds metadata annotations
 * from corresponding metadata.json files to their JSDoc comments.
 *
 * This job:
 * 1. Scans for all *.component.ts files in the src/components directory
 * 2. For each component, looks for a metadata.json file in the same directory
 * 3. If found, enriches the component's JSDoc with metadata annotations
 * 4. Writes the updated content back to the component file
 */
export const runAddMetadataToComponents = job(
  'Adding metadata annotations to component files',
  async () => {
    const componentsDir = getPath('../src/components');
    const optimizedPath = optimizePathForWindows(componentsDir);

    // Find all component files
    const componentFiles = await globby(`${optimizedPath}/**/*.component.ts`);

    // Process all component files and collect results
    const processedFiles = componentFiles.map(async filePath => {
      try {
        const content = readFileSync(filePath, 'utf-8');
        const relativePath = filePath.replace(getPath('..'), '');

        const result = addMetadataToComponents(relativePath, content);

        // Only write if content changed
        if (result.content !== content) {
          await writeFile(filePath, result.content, 'utf-8');
          return { filePath, processed: true };
        }

        return { filePath, processed: false };
      } catch (error) {
        throw new Error(`Failed to process ${filePath}: ${error.message}`);
      }
    });

    const results = await Promise.all(processedFiles);
    const processedCount = results.filter(result => result.processed).length;

    if (processedCount > 0) {
      console.log(`✓ Updated ${processedCount} component file(s) with metadata annotations`);
    } else {
      console.log('✓ No component files needed metadata updates');
    }
  },
);
