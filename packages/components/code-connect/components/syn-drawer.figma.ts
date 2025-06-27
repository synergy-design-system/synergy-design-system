import figma, { html } from '@figma/code-connect/html';
import type SynDrawer from '../src/components/drawer/drawer.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - prefix and suffix slots should allow to set instances with slot="prefix" and slot="suffix"
 */

// header helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7947', {
  example: ({
    defaultSlot,
  }) => html`
    <h3 slot="label">${defaultSlot}</h3>
  `,
  imports: [],
  links: [],
  props: {
    defaultSlot: figma.string('value'),
  },
});

// content helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7951', {
  example: () => html`
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  `,
  imports: [],
  links: [],
});

// footer helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7949', {
  example: ({
    defaultSlot,
  }) => html`
    <div slot="footer">
      ${defaultSlot}
    </div>
  `,
  imports: [],
  links: [],
  props: {
    defaultSlot: figma.children('*'),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7953', {
  example: ({
    headerSlot,
    headerActionsSlot,
    defaultSlot,
    footerSlot,
  }) => html`
    <syn-drawer>
      ${headerSlot}
      ${headerActionsSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-drawer>
  `,
  imports: [
    'import { SynDrawer } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-drawer--docs',
    },
  ],
  props: {
    headerSlot: figma.boolean('header', {
      true: figma.instance('↳ <slot-header>'),
    }),
    headerActionsSlot: figma.boolean('header-actions', {
      true: html`
        <syn-icon-button name="wallpaper" label="Action" slot="header-actions"></syn-icon-button>
      `,
    }),
    defaultSlot: figma.boolean('*content', {
      true: figma.instance('↳ *<slot-content>'),
    }),
    footerSlot: figma.boolean('footer', {
      true: figma.instance('↳ slot-footer'),
    }),
  } satisfies ValidProperties<SynDrawer, ['default', 'header', 'headerActions', 'footer']>,
});
