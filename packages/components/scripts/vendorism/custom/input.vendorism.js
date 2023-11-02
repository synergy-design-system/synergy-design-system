import { removeSection } from '../remove-section.js';

export default (path, content) => {
  const output = { content, path };

  if (!path.includes('input.component.ts')
    && !path.includes('input.styles.ts')
    && !path.includes('input.stories.ts')
    && !path.includes('input.test.ts')
  ) {
    return output;
  }
  // We don't provide a filled property in Synergy, but instead use the filled styles for readonly
  // update stories
  output.content = output.content.replace('<syn-input placeholder="Type something" filled>', '<syn-input value="Readonly content" readonly>');
  output.content = output.content.replaceAll('Filled', 'Readonly');

  // update component and styles
  output.content = removeSection(output.content, '/** Draws a filled', 'filled = false;');
  output.content = output.content.replaceAll('filled', 'readonly'); // makes changes in styles and components

  // Pill is not supported in Synergy
  output.content = removeSection(output.content, "'input--pill':", ',');
  output.content = removeSection(output.content, '/** Draws a pill-style', 'pill = false;');

  // We need to add classes depenending on prefix and suffix slots to use them in CSS
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

  // remove tests for pill and filled
  output.content = removeSection(output.content, 'expect(el.filled)', ';');
  output.content = removeSection(output.content, 'expect(el.pill)', ';');

  // @todo remove this when syn-textarea and syn-checkbox are available
  output.content = output.content.replace(/syn-textarea/g, 'syn-input');
  output.content = output.content.replace(/syn-checkbox/g, 'syn-input');

  return output;
};
