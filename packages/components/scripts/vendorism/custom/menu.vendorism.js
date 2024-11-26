import { addSectionsAfter } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'menu.component.ts',
];

const transformComponent = (path, originalContent) => {
  const content = addSectionsAfter([
    // Add the state, classmap and synattributeschanged events
    [
      "import { query } from 'lit/decorators.js';",
      `import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SynAttributesChangedEvent } from '../../events/syn-attributes-changed.js';`,
    ],
    // Add support for the needed state and methods
    [
      "@query('slot') defaultSlot: HTMLSlotElement;",
      `  @state() hasMenuItemsWithCheckmarks = false;

  private handleUpdateCheckmarks(items: SynMenuItem[]) {
    // #368: Treat a menu as having checkmarks if it has any checkboxes or items with loading states
    // The loading indicator has to be checked as well, as it's specially placed over the check mark
    this.hasMenuItemsWithCheckmarks = items.some(item => item.type === 'checkbox' || item.loading);  
  }

  private updateCheckMarksByChildPropChange = (e: SynAttributesChangedEvent) => {
    e.stopPropagation();
    this.handleUpdateCheckmarks(this.getAllItems());
  };
  
  disconnectedCallback() {
    this.removeEventListener('syn-attributes-changed', this.updateCheckMarksByChildPropChange);
  }`,
    ],
    // Add the event listener to connectedCallback
    [
      "this.setAttribute('role', 'menu');",
      "    this.addEventListener('syn-attributes-changed', this.updateCheckMarksByChildPropChange);",
    ],
    // Add the slotchange event
    [
      `private handleSlotChange() {
    const items = this.getAllItems();`,
      '    this.handleUpdateCheckmarks(items);',
    ],
    // Add the classmap to the slot
    [
      '<slot',
      `        class=\${classMap({
          'menu--no-checkmarks': !this.hasMenuItemsWithCheckmarks,
        })}`,
    ],
  ], originalContent);
  return {
    content,
    path,
  };
};

export const vendorMenu = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('menu.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
