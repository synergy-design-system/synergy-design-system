import { removeSection } from '../remove-section.js';

export const vendorButtonGroup = (path, content) => {
  const output = { content, path };

  if (!path.includes('button-group.component.ts')
    && !path.includes('button-group.styles.ts')
    && !path.includes('button-group.stories.ts')
    && !path.includes('button-group.test.ts')
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

  // // remove tests for pill and filled
  output.content = removeSection(output.content, 'expect(el.filled)', ';');

  return output;
};
