import { removeSection } from '../remove-section.js';

export const vendorRadio = (path, content) => {
  const output = { content, path };

  if (!path.includes('radio.component.ts')
    && !path.includes('radio.styles.ts')
    && !path.includes('radio.stories.ts')
    && !path.includes('radio.test.ts')
  ) {
    return output;
  }
  // We don't provide a filled property in Synergy, but instead use the filled styles for readonly
  // update stories
  output.content = output.content.replace('<syn-radio placeholder="Type something" filled>', '<syn-radio value="Readonly content" readonly>');
  output.content = output.content.replaceAll('Filled', 'Readonly');

  // update component and styles
  output.content = removeSection(output.content, '/** Draws a filled', 'filled = false;');
  output.content = output.content.replaceAll('filled', 'readonly'); // makes changes in styles and components

  // We need to add classes depending on prefix and suffix slots to use them in CSS
  output.content = output.content.replace(
    "HasSlotController(this, 'help-text', 'label')",
    "HasSlotController(this, 'help-text', 'label', 'prefix', 'suffix')",
  );
  output.content = output.content.replace(
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');",
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');\n    const hasPrefixSlot = this.hasSlotController.test('prefix');\n    const hasSuffixSlot = this.hasSlotController.test('suffix');",
  );
  output.content = output.content.replace(
    "'form-control--has-help-text': hasHelpText",
    "'form-control--has-help-text': hasHelpText,\n          'form-control--has-prefix': hasPrefixSlot,\n          'form-control--has-suffix': hasSuffixSlot",
  );

  // // remove tests for pill and filled
  output.content = removeSection(output.content, 'expect(el.filled)', ';');

  return output;
};
