/* eslint-disable complexity */
import { removeSection } from '../remove-section.js';

export const vendorTag = (path, content) => {
  const output = { content, path };

  if (!path.includes('tag.component.ts')
    && !path.includes('tag.styles.ts')
    && !path.includes('tag.test.ts')
  ) {
    return output;
  }

  // Remove pill prop from component
  output.content = removeSection(output.content, '/** Draws a pill-style', ';');

  // Remove variant prop from component
  output.content = removeSection(output.content, '/** The tag\'s theme variant. */', ';');

  // Remove the variant-related conditional class names in the render method
  output.content = removeSection(output.content, '// Types', '// Sizes', { preserveEnd: true, removePrecedingWhitespace: false });

  // Remove pill prop from render method
  output.content = removeSection(output.content, '\'tag--pill\':', ',');

  // Remove pill from CSS
  output.content = removeSection(output.content, '/*\n   * Pill modifier', '}', { preserveEnd: false, removePrecedingWhitespace: false });

  // Remove variant title from CSS
  output.content = removeSection(output.content, '/*\n   * Variant modifiers', '/*', { preserveEnd: true, removePrecedingWhitespace: false });

  // Remove variant from tests
  output.content = removeSection(output.content, 'describe("variant attribute"', '});');

  return output;
};
