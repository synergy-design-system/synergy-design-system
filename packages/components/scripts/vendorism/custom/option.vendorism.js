import { addSectionsBefore, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'option.component.ts',
  'option.styles.ts',
  'option.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = replaceSections([
    // Fix performance issues for many options:
    // only trigger handleDefaultSlotChange for controller, if it is not the initial render
    // TODO: can be removed if shoelace fixed this issue on their side
    [
      `
    // When the label changes, tell the controller to update
    customElements.whenDefined('syn-select').then(() => {
      const controller = this.closest('syn-select');
      if (controller) {
        controller.handleDefaultSlotChange();
      }
    });`,
      `
      if(this.isInitialized) {
      // When the label changes, tell the controller to update
      customElements.whenDefined('syn-select').then(() => {
        const controller = this.closest('syn-select');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }`,
    ],
  ], originalContent);

  content = addSectionsBefore(
    [
      // Fix performance issues for many options:
      // only trigger handleDefaultSlotChange for controller, if it is not the initial render
      // TODO: can be removed if shoelace fixed this issue on their side
      [
        "@query('.option__label') defaultSlot: HTMLSlotElement;",
        'private isInitialized = false;',
        { newlinesAfterInsertion: 2, tabsAfterInsertion: 1 },
      ],
      // Add "handleDefaultSlotChange" trigger for syn-combobox
      [
        "customElements.whenDefined('syn-select').then(() => {",
    `customElements.whenDefined('syn-combobox').then(() => {
        const controller = this.closest('syn-combobox');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });`,
    { tabsAfterInsertion: 3 },
      ],
    ],
    content,
  );

  return {
    content,
    path,
  };
};

export const vendorOption = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('option.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
