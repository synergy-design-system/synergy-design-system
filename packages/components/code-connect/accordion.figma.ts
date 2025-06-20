/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88547', {
  example: ({
    contained,
    detail1,
    size,
  }) => html`
    <syn-accordion
      contained=${contained}
      size=${size}
    >
      ${detail1}
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
    detail1: figma.boolean('detail-1', {
      true: figma.children('syn-details'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
    }),
  },
});
