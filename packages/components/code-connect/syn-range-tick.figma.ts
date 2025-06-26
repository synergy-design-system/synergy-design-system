import figma, { html } from '@figma/code-connect/html';
import type SynRangeTick from '../src/components/range-tick/range-tick.js';
import type { ValidProperties } from './core/types';

// Ticks helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-36003', {
  example: ({
    defaultSlot,
  }) => html`
    <div style="justify-content: space-between; flex-direction: row; display: flex;">
      ${defaultSlot}
    </div>
  `,
  props: {
    defaultSlot: figma.children('*'),
  }
});

// Slot helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-38421', {
  example: ({
    defaultSlot,
  }) => html`${defaultSlot}`,
  props: {
    defaultSlot: html`0`,
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-38412', {
  example: ({
    defaultSlot,
    subdivision,
  }) => html`
    <syn-range-tick
      subdivision=${subdivision}
    >
      ${defaultSlot}
    </syn-range-tick>
  `,
  imports: [
    'import { SynRangeTick } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-range-tick--docs',
    },
  ],
  props: {
    defaultSlot: figma.boolean('*label', {
      true: figma.instance('<slot (default)>'),
    }),
    subdivision: figma.boolean('subdivision'),
  } satisfies ValidProperties<SynRangeTick>,
});
