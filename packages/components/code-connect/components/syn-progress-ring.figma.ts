import figma, { html } from '@figma/code-connect/html';
import type SynProgressRing from '../../src/components/progress-ring/progress-ring.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16193-20867', {
  example: ({
    defaultSlot,
    value,
  }) => html`
    <syn-progress-bar
      value="${value}"
    >
      ${defaultSlot}
    </syn-progress-bar>
  `,
  imports: [
    'import { SynProgressRing } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-progress-ring--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('<slot>'),
    value: 25, // Default value in figma, not configurable :(
  } satisfies ValidProperties<SynProgressRing>,
});
