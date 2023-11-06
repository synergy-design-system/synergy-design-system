import { removeSection } from '../remove-section.js';

export const vendorButton = (path, content) => {
  const output = { content, path };

  if (!path.includes('button.component.ts')
    && !path.includes('button.styles.ts')
    && !path.includes('button.test.ts')
  ) {
    return output;
  }
  // Remove unneeded modifiers from component's classMap
  ['pill', 'circle', 'danger', 'warning', 'success', 'neutral', 'default'].forEach((modifier) => {
    output.content = removeSection(output.content, `'button--${modifier}':`, ',');
  });

  // Remove pill and circle props from component
  output.content = removeSection(output.content, '/** Draws a pill-style', ';');
  output.content = removeSection(output.content, '/**\n   * Draws a circular', ';');

  // Remove pill and circle from CSS
  ['Pill', 'Circle'].forEach((modifier) => {
    output.content = removeSection(
      output.content,
      `  /*\n   * ${modifier} modifier`,
      '  /*',
      { preserveEnd: true, removePrecedingWhitespace: false },
    );
  });

  // Remove all colors except primary from CSS
  ['Success', 'Warning', 'Danger', 'Neutral', 'Default'].forEach((color) => {
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

  // Use variant prop for "shape"
  output.content = removeSection(output.content, '@property({ reflect: true }) variant:', ';', { preserveEnd: true, preserveStart: true, removePrecedingWhitespace: false });
  output.content = removeSection(output.content, '/** Draws an outlined', ';');
  output.content = output.content.replace('variant:', "variant: 'default' | 'outline' | 'text' = 'default'");
  output.content = output.content.replace('!this.outline', 'this.variant === \'default\'');
  output.content = output.content.replace('this.outline', 'this.variant === \'outline\'');

  // Set "primary" as default color
  // If we need more colors later, a "color" prop would have to be added
  output.content = output.content.replace("this.variant === 'primary'", 'true');

  // Rename "standard" class to default
  output.content = output.content.replace(/button--standard/g, 'button--default');

  // Fix tests
  output.content = output.content.replace("const variants = ['default', 'primary', 'success', 'neutral', 'warning', 'danger'];", "const variants = ['default', 'outline', 'text'];");
  ['outline', 'pill', 'circle'].forEach((prop) => {
    output.content = removeSection(output.content, `expect(el.${prop})`, ';');
  });

  return output;
};
