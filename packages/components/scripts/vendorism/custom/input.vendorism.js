function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape special characters
}

function removeLineContaining(input, start, end, removePrecedingWhitespace = false) {
  let regex;

  if (removePrecedingWhitespace) {
    regex = new RegExp(`\\n?[\\t\\s]*${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'gm');
  } else {
    regex = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'gm');
  }

  return input.replace(regex, '');
}

export default (path, content) => {
  const output = { content, path };

  if (path.includes('input.component.ts')) {
    // Pilled is not supported in Synergy
    output.content = removeLineContaining(output.content, "'input--pill':", ',', true);
    output.content = removeLineContaining(output.content, '/** Draws a pill-style', 'pill = false;', true);
    // We need to add the prefix and suffix slots to the input component
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
  }

  // We don't provide a filled property in Synergy, but instead use the filled styles for readonly
  if (path.includes('input.component.ts') || path.includes('input.styles.ts') || path.includes('input.stories.ts')) {
    // update stories
    output.content = output.content.replace('<syn-input placeholder="Type something" filled>', '<syn-input value="Readonly content" readonly>');
    output.content = output.content.replaceAll('Filled', 'Readonly');

    // update component and styles
    output.content = removeLineContaining(output.content, '/** Draws a filled', 'filled = false;', true);
    output.content = output.content.replaceAll('filled', 'readonly'); // makes changes in styles and components
  }
  return output;
};
