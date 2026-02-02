import {
  addSectionsAfter,
  replaceSections,
} from '../replace-section.js';
import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'popup.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // #849: Add support for popover
  let content = addSectionsAfter([
    // 1. Add needed import to ifDefined
    [
      "directives/class-map.js';",
      "import { ifDefined } from 'lit/directives/if-defined.js';",
    ],
    // 2. Add test for popover support
    [
      "import type { CSSResultGroup } from 'lit';",
      "\nconst SUPPORTS_POPOVER = globalThis?.HTMLElement?.prototype.hasOwnProperty('popover');",
    ],
    // 3. Add showPopover to start method
    [
      `if (!this.anchorEl || !this.active) {
      return;
    }`,
      `
    if (SUPPORTS_POPOVER) {
      this.popup.showPopover?.();
    }`,
    ],
    // 4. Add hidePopover to stop method
    [
      'return new Promise(resolve => {',
      `      if (SUPPORTS_POPOVER) {
        // #1041 In some testing frameworks the disconnectedCallback is called too early so this.popup is not yet available
        this.popup?.hidePopover?.();
      }`,
    ],
  ], originalContent);

  content = replaceSections([
    // 5. Adjust getOffsetParent to always return absolute if popover is supported
    [
      "this.strategy === 'absolute'",
      'SUPPORTS_POPOVER',
    ],
    // 6. Make sure to take popover support into account for strategy
    [
      'strategy: this.strategy,',
      "strategy: SUPPORTS_POPOVER ? 'absolute' : 'fixed',",
    ],
    // 7. Use ifDefined for the popup's style attribute
    [
      'part="popup"',
      `part="popup"
        popover=$\{ifDefined(SUPPORTS_POPOVER ? 'manual' : undefined)}`,
    ],
    // 8. Take the popover support into account for the popup-fixed class
    [
      "'popup--fixed': this.strategy === 'fixed'",
      "'popup--fixed': !SUPPORTS_POPOVER",
    ],
  ], content);

  // #1149: Remove strategy property
  content = removeSections([
    [
      `/**
   * Determines how the popup is positioned.`,
      "'absolute' | 'fixed' = 'absolute';",
    ],
  ], content);

  return {
    content,
    path,
  };
};

export const vendorPopup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('popup.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
