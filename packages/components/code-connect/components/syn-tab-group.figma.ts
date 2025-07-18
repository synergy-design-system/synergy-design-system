import figma, { html } from '@figma/code-connect/html';
import type SynTabGroup from '../../src/components/tab-group/tab-group.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-44793', {
  example: ({
    contained,
    defaultSlot,
    placement,
    sharp,
  }) => html`
    <syn-tab-group
      contained=${contained}
      placement=${placement}
      sharp=${sharp}
    >
      ${defaultSlot}
    </syn-tab-group>
  `,
  imports: [
    'import { SynTabGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab-group--docs',
    },
  ],
  props: {
    contained: figma.boolean('contained'),
    defaultSlot: figma.children('*'),
    placement: figma.enum('alignment', {
      end: 'end',
      start: 'start',
      top: 'top',
    }),
    sharp: figma.boolean('sharp'),
  } satisfies ValidProperties<SynTabGroup>,
});
