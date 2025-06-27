import figma, { html } from '@figma/code-connect/html';
import type SynAccordion from '../src/components/accordion/accordion.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - default slot should be visible whenever one of the details is open, not just the first one
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88547', {
  example: ({
    contained,
    defaultSlot,
    size,
  }) => html`
    <syn-accordion
      contained=${contained}
      size=${size}
    >
      ${defaultSlot}
    </syn-accordion>
  `,
  imports: [
    'import { SynAccordion } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs',
    },
  ],
  props: {
    contained: figma.boolean('contained'),
    defaultSlot: figma.boolean('detail-1', {
      true: figma.children('syn-details'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
    }),
  } satisfies ValidProperties<SynAccordion>,
});
