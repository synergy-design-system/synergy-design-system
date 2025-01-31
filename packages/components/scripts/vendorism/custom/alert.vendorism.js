import { addSectionAfter, replaceSections } from '../replace-section.js';
import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'alert.styles.ts',
  'alert.component.ts',
];

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove all variant styles as they do not apply anymore
    ['.alert--primary', '.alert__message {', {
      preserveEnd: true,
      removePrecedingWhitespace: false,
    }],
    // Remove the overflow:hidden, which came with shoelace 2.17.0,
    // as we do not use the countdown feature and it breaks the left border style
    ['overflow: hidden;', ''],
  ], originalContent);

  return {
    content,
    path,
  };
};

const transformComponent = (path, originalContent) => {
  const contentWithoutCountdown = replaceSections([
    // Begin remove countdown
    [
      "@property({ type: String, reflect: true }) countdown?: 'rtl' | 'ltr';",
      "private countdown? : 'rtl' | 'ltr';",
    ],
    [
      "          'alert--has-countdown': !!this.countdown,\n",
      '',
    ],
    // End remove countdown.
  ], originalContent);

  // #762: Remove the global toast stack for a local version in
  // the alert component to make sure ssr works
  const contentWithoutToastStack = removeSections([
    [
      'const toastStack = Object.assign',
      ';',
    ],
  ], contentWithoutCountdown);

  const contentUsingStaticMethods = replaceSections([
    // Replace all occurences of tostStack with this.toastStack
    ['toastStack', 'SynAlert.toastStack'],
  ], contentWithoutToastStack);

  const content = addSectionAfter(
    contentUsingStaticMethods,
    'SynergyElement {',
    `
  private static currentToastStack: HTMLDivElement;

  private static get toastStack() {
    if (!this.currentToastStack) {
      this.currentToastStack = Object.assign(document.createElement('div'), {
        className: 'syn-toast-stack',
      });
    }
    return this.currentToastStack;
  }    
    `,
  );

  return {
    content,
    path,
  };
};

export const vendorAlert = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('alert.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('alert.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
