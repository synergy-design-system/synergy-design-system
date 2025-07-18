import figma, { html } from '@figma/code-connect/html';
import type SynRadio from '../../src/components/radio/radio.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1345-21578', {
  example: ({
    defaultSlot,
    disabled,
    size,
  }) => html`
    <syn-radio
      disabled=${disabled}
      size=${size}
    >
      ${defaultSlot}
    </syn-radio>
  `,
  imports: [
    'import { SynRadio } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio--docs',
    },
  ],
  props: {
    defaultSlot: figma.instance('↳ <slot (default)>'),
    disabled: figma.boolean('disabled'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
  } satisfies ValidProperties<SynRadio>,
});
