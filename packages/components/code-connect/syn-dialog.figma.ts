import figma, { html } from '@figma/code-connect/html';
import type SynDialog from '../src/components/dialog/dialog.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 */

// Footer helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28313', {
  example: ({
    defaultSlot,
  }) => html`
    ${defaultSlot}
  `,
  props: {
    defaultSlot: figma.children('*'),
  }
});

// Footer content helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28315', {
  example: ({
    filledButton,
    textButton,
  }) => html`
    ${filledButton}
    ${textButton}
  `,
  props: {
    filledButton: figma.boolean('filled button', {
      true: html`<syn-button variant="filled" slot="footer">Save</syn-button>`,
    }),
    textButton: figma.boolean('text button', {
      true: html`<syn-button variant="text" slot="footer">Cancel</syn-button>`,
    }),
  }
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28299', {
  example: ({
    headerSlot,
    footerSlot,
    defaultSlot,
    noHeader,
  }) => html`
    <syn-dialog
      open
      no-header=${noHeader}
    >
      ${headerSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-dialog>
  `,
  imports: [
    'import { SynDialog } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-dialog--docs',
    },
  ],
  props: {
    headerSlot: figma.boolean('*header', {
      true: figma.children('_helper/syn-drawer/header'),
    }),
    footerSlot: figma.boolean('footer', {
      true: figma.children('_helper/syn-dialog/footer'),
    }),
    defaultSlot: figma.boolean('*content', {
      true: figma.children('_helper/syn-drawer/content'),
    }),
    noHeader: figma.boolean('*header', {
      true: false,
      false: true,
    }),
  } satisfies ValidProperties<SynDialog, ['default', 'header', 'footer']>,
});
