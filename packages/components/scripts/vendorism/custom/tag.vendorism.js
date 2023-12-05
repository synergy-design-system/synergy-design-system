import { removeSection } from '../remove-section.js';

export const vendorTag = (path, content) => {
  const output = { content, path };

  if (!path.includes('tag.component.ts')
    && !path.includes('tag.styles.ts')
    && !path.includes('tag.test.ts')
  ) {
    return output;
  }

  // Remove all variant related styles and classes except for neutral
  ['pill', 'danger', 'warning', 'success', 'default'].forEach((modifier) => {
    output.content = removeSection(output.content, `'tag--${modifier}':`, ',');
  });

  // Remove pill prop from component
  output.content = removeSection(output.content, '/** Draws a pill-style', ';');

  // Remove pill from CSS
  output.content = removeSection(output.content, '\n * Pill modifier', ' /*', { preserveEnd: true, removePrecedingWhitespace: false });

  // Remove variant prop from component
  output.content = removeSection(output.content, '/** The tag\'s theme variant. */', ';');
  
  // Remove the variant-related conditional class names in the render method
  output.content = removeSection(output.content, '// Types', '// Sizes', { preserveEnd: true, removePrecedingWhitespace: false });

  // Remove any CSS related to other variants, keeping only neutral
  ['Success', 'Warning', 'Danger', 'Default', 'Pill'].forEach((variant) => {
    [0, 1].forEach(() => {
      output.content = removeSection(
        output.content,
        `/* ${variant}`,
        '/*',
        { preserveEnd: true, removePrecedingWhitespace: false },
      );
    });
  });

  output.content = removeSection(output.content, 'describe("variant attribute"', '});');

  output.content = output.content.replace(/this\.variant === 'neutral'/g, 'true');

  return output;
};
