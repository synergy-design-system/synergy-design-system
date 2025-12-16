import { addSectionsAfter, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'button-group.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = addSectionsAfter([
    // Add imports
    [
      "import type { CSSResultGroup } from 'lit';",
      `
import type SynButton from '../button/button.component.js';
import type SynRadioButton from '../radio-button/radio-button.component.js';
import { watch } from '../../internal/watch.js';
      `.trim(),
    ],

    // Add properties
    [
      "@property() label = '';",
      `
  /** The button-groups size. This affects all buttons within the group. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The button-group's theme variant. This affects all buttons within the group. */
  @property({ reflect: true }) variant: 'filled' | 'outline' = 'outline';

  // Make sure we update the buttons when the size or variant changes
  @watch(['size', 'variant'], { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.handleSlotChange();
  }
      `.trimEnd(),
    ],
  ], originalContent);

  // Update the slotchange event handler
  content = replaceSections([
    // Make sure types match for the button
    [
      'const button = findButton(el);',
      'const button = findButton(el) as SynButton | SynRadioButton;',
    ],
    // Set the size of the buttons
    [
      "button.toggleAttribute('data-syn-button-group__button', true);",
      `button.size = this.size;

        if (button.tagName.toLowerCase() === 'syn-button') {
          (button as SynButton).variant = this.variant;
        }

        button.toggleAttribute('data-syn-button-group__button', true);`,
    ],
  ], content);

  return {
    content,
    path,
  };
};

export const vendorButtonGroup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('button-group.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
