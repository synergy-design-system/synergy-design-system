import figma, { html } from '@figma/code-connect/html';
import type SynMenuLabel from '../src/components/menu-label/menu-label.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=10666-9080', {
  example: ({
    defaultSlot,
    style,
  }) => html`
    <syn-menu-label
      style=${style}
    >
      ${defaultSlot}
    </syn-menu-label>
  `,
  imports: [
    'import { SynMenuLabel } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu-label--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('*value'),
    style: figma.boolean('*divider', {
      false: html`--display-divider: none;`,
    }),
  } satisfies ValidProperties<SynMenuLabel>,
});
