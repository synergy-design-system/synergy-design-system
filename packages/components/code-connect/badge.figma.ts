import figma, { html } from '@figma/code-connect/html';
import type SynBadge from '../src/components/badge/badge.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=14127-697924&t=HVv51unRzmD4igDU-4', {
  example: ({
    defaultSlot,
    variant,
  }) => html`
    <syn-badge
      variant=${variant}
    >
      ${defaultSlot}
    </syn-badge>
  `,
  imports: [
    'import { SynBadge } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-badge--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('*value'),
    variant: figma.enum('variant', {
      danger: 'danger',
      neutral: 'neutral',
      primary: 'primary',
      success: 'success',
      text: 'text',
      'text-inverted': 'text-inverted',
      warning: 'warning',
    }),
  } satisfies ValidProperties<SynBadge>,
});
