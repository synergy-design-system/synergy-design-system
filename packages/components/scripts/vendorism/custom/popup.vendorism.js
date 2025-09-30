import {
  addSectionAfter,
  addSectionsAfter,
  replaceSections,
} from '../replace-section.js';

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
        this.popup.hidePopover?.();
      }`,
    ],
  ], originalContent);

  content = replaceSections([
    // 5. Adjust getOffsetParent to always return absolute if popover is supported
    [
      "this.strategy === 'absolute'",
      "SUPPORTS_POPOVER || this.strategy === 'absolute'",
    ],
    // 6. Make sure to take popover support into account for strategy
    [
      'strategy: this.strategy,',
      "strategy: SUPPORTS_POPOVER ? 'absolute' : this.strategy,",
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
      "'popup--fixed': !SUPPORTS_POPOVER && this.strategy === 'fixed'",
    ],
  ], content);

  // Mark the strategy as deprecated
  content = addSectionAfter(
    content,
    'strategy can often workaround it.',
    ' * @deprecated The strategy property is deprecated and will be removed in future versions. Modern browsers support the popover element which is used internally instead.',
    {
      tabsBeforeInsertion: 1,
    }
  );

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
