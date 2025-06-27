import figma, { html } from '@figma/code-connect/html';
import type SynProgressBar from '../../src/components/progress-bar/progress-bar.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16209-20856', {
  example: ({
    defaultSlot,
    indeterminate,
    value,
  }) => html`
    <syn-progress-bar
      indeterminate="${indeterminate}"
      value="${value}"
    >
      ${defaultSlot}
    </syn-progress-bar>
  `,
  imports: [
    'import { SynProgressBar } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-progress-bar--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('<slot>'),
    indeterminate: figma.boolean('indeterminate'),
    value: figma.boolean('indeterminate', {
      false: 30, // Default in figma, not configurable :(
      true: undefined,
    }),
  } satisfies ValidProperties<SynProgressBar>,
});
