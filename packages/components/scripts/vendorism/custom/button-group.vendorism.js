import { addSectionsAfter, addSectionsBefore, replaceSections } from '../replace-section.js';

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

  private mutationObserver: MutationObserver;
      `.trimEnd(),
    ],
  ], originalContent);

  // Add support for mutation observer that syncs button attributes
  content = addSectionsBefore([
    [
      '  render() {',
      `  firstUpdated() {
    const startObserving = () => {
      this.mutationObserver.observe(this, {
        subtree: true,
        attributes: true,
        attributeFilter: ['size', 'variant'],
      });
    };

    this.mutationObserver = new MutationObserver((entries) => {
      // Temporarily disconnect to prevent infinite loop
      this.mutationObserver.disconnect();

      // Check if the button-group itself changed or its children
      const buttonGroupChanged = entries.some(entry => entry.target === this);
      const childrenChanged = entries.some(entry => entry.target !== this);

      if (childrenChanged) {
        // Handle child button changes (existing logic)
        entries
          .filter(entry => entry.target !== this)
          .forEach(entry => {
            const target = entry.target as HTMLElement;
            const button = findButton(target) as SynButton | SynRadioButton;

            if (button) {
              // Unset the size property to allow button-group to control it
              button.size = undefined as any;

              // Also unset variant for syn-buttons
              if (button.tagName.toLowerCase() === 'syn-button') {
                (button as SynButton).variant = undefined as any;
              }
            }
          });
      }

      // Handle both cases: button-group changes and child changes
      if (buttonGroupChanged || childrenChanged) {
        this.handleSlotChange();
      }
      
      // Reconnect observer after changes are done
      this.updateComplete.then(() => {
        startObserving();
      });
    });

    startObserving();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
  }
`,
    ],
  ], content);

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
