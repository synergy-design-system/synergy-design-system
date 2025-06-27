import figma, { html } from '@figma/code-connect/html';
import type SynPrioNav from '../../src/components/prio-nav/prio-nav.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-10982', {
  example: ({
    defaultSlot,
  }) => html`
    <syn-prio-nav>
      ${defaultSlot}
    </syn-prio-nav>
  `,
  imports: [
    'import { SynPrioNav } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('syn-nav-item'),
  } satisfies ValidProperties<SynPrioNav>,
});
