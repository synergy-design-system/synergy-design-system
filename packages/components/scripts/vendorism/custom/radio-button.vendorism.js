import { removeSection } from '../remove-section.js';

export const vendorRadioButton = (path, content) => {
  const output = { content, path };

  if (!path.includes('radio-button.component.ts')
    && !path.includes('radio-button.styles.ts')
    && !path.includes('radio-button.test.ts')
  ) {
    return output;
  }
  // Remove unneeded modifiers from component's classMap
  ['pill', 'default'].forEach((modifier) => {
    output.content = removeSection(output.content, `'button--${modifier}':`, ',');
  });

  // Remove pill and circle props from component
  output.content = removeSection(output.content, '/** Draws a pill-style', ';');

  // Remove pill and circle from CSS
  ['Pill'].forEach((modifier) => {
    output.content = removeSection(
      output.content,
      `  /*\n   * ${modifier} modifier`,
      '  /*',
      { preserveEnd: true, removePrecedingWhitespace: false },
    );
  });

  // Remove all colors except primary from CSS
  ['Default'].forEach((color) => {
    // They appear twice in the file
    [0, 1].forEach(() => {
      output.content = removeSection(
        output.content,
        `/* ${color}`,
        '/*',
        { preserveEnd: true, removePrecedingWhitespace: false },
      );
    });
  });

  // Set "primary" as default color
  // If we need more colors later, a "color" prop would have to be added
  output.content = output.content.replace("this.variant === 'primary'", 'true');

  // Rename "standard" class to default
  output.content = output.content.replace(/button--standard/g, 'button--filled');

  ['pill'].forEach((prop) => {
    output.content = removeSection(output.content, `expect(el.${prop})`, ';');
  });

  return output;
};
