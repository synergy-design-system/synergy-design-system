import figma, { html } from '@figma/code-connect/html';
import type SynDetails from '../src/components/details/details.js';
import type { ValidProperties } from './core/types';

// Needed helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88538', {
  example: ({
    content,
    subheadline,
  }) => html`
    <div>
      <h3>${subheadline}</h3>
      ${content}
    </div>
  `,
  imports: [],
  props: {
    content: figma.enum('content', {
      text: figma.string('↳ content'),
    }),
    subheadline: figma.boolean('subheadline', {
      true: figma.string('↳ subheadline'),
    }),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88398', {
  example: ({
    contained,
    defaultSlot,
    disabled,
    open,
    size,
    summary,
  }) => html`
    <syn-details
      contained=${contained}
      disabled=${disabled}
      open=${open}
      size=${size}
      summary=${summary}
    >
      ${defaultSlot}
    </syn-details>
  `,
  imports: [
    'import { SynDetails } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-details--docs',
    },
  ],
  props: {
    contained: figma.boolean('contained'),
    defaultSlot: figma.instance('<content slot>'),
    disabled: figma.boolean('disabled'),
    open: figma.boolean('open'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
    }),
    summary: figma.string('summary'),
  } satisfies ValidProperties<SynDetails>,
});
