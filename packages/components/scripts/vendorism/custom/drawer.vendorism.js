import { addSectionsAfter, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'drawer.component.ts',
  'drawer.styles.ts',
  'drawer.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = originalContent;

  // Add some stuff to the drawer to make the code of the syn-side-nav easier and cleaner
  content = replaceSections(
    [
      [
        `firstUpdated() {
    this.drawer.hidden = !this.open;`,
        `firstUpdated() {
    this.drawer.hidden = this.isVisible ? false : !this.open;`,
      ],
      [
        `this.drawer.hidden = true;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;`,
      `this.drawer.hidden = !this.isVisible;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;`,
      ],
      [
        'render() {',
        `// Forces the visibility of the drawer even with \`open\` set to false. This is needed for the \`rail\` and \`sticky\` variant of the syn-side-nav
  forceVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
    this.drawer.hidden = isVisible ? false : !this.open;
  }

  render() {`,
      ],
      [
        // eslint-disable-next-line no-template-curly-in-string
        "aria-hidden=${this.open ? 'false' : 'true'}",
        // eslint-disable-next-line no-template-curly-in-string
        "aria-hidden=${this.isVisible ? 'false' : this.open ? 'false' : 'true'}",
      ],
    ],
    content,
  );
  content = addSectionsAfter([
    [
      'import { property, query',
      ', state',
      { newlinesBeforeInsertion: 0 },
    ],
    [
      'private closeWatcher: CloseWatcher | null;',
      '@state() private isVisible = false; // force visibility even with open set to false',
      { newlinesBeforeInsertion: 2, tabsBeforeInsertion: 1 },
    ],
  ], content);

  return {
    content,
    path,
  };
};

export const vendorDrawer = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('drawer.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
