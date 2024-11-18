import { addSectionsAfter } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'menu.component.ts',
];

const transformComponent = (path, originalContent) => {
  const content = addSectionsAfter([
    [
      "import { query } from 'lit/decorators.js';",
      `import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';`,
    ],
    [
      'defaultSlot: HTMLSlotElement;',
      '  @state() hasMenuItemsWithCheckmarks = false;',
    ],
    [
      '<slot',
      `        class=\${classMap({
          'menu--no-checkmarks': !this.hasMenuItemsWithCheckmarks,
        })}`,
    ],
    [
      `private handleSlotChange() {
    const items = this.getAllItems();`,
      `
    // #368: Treat a menu as having checkmarks if it has any checkboxes or items with loading states
    // The loading indicator has to be checked as well, as it's specially placed over the check mark
    this.hasMenuItemsWithCheckmarks = items.some(item => item.type === 'checkbox' || item.loading);`,
    ],
    // Begin remove countdown
    // [
    //   "@property({ type: String, reflect: true }) countdown?: 'rtl' | 'ltr';",
    //   "private countdown? : 'rtl' | 'ltr';",
    // ],
    // [
    //   "          'alert--has-countdown': !!this.countdown,\n",
    //   '',
    // ],
    // End remove countdown.
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
