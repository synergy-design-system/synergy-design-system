/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1080-6566&t=QM5ExbII4BRhqFoo-4', {
  example: ({
    disabled,
    size,
    label,
    loading,
    slotPrefix,
    slotSuffix,
    variant,
  }) => html`
    <syn-button
      disabled=${disabled}
      size=${size}
      loading=${loading}
      variant=${variant}
    >
      ${label}
      <span slot="prefix">${slotPrefix}</span>
      <span slot="suffix">${slotSuffix}</span>
    </syn-button>
  `,
  imports: [
    'import { SynButton } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs',
    },
  ],
  props: {
    disabled: figma.boolean('disabled'),
    label: figma.boolean('<slot label>', {
      true: figma.string('↳ label'),
    }),
    loading: figma.boolean('loading'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    slotPrefix: figma.boolean('<slot-prefix>', {
      true: figma.instance('↳ <slot-prefix>'),
    }),
    slotSuffix: figma.boolean('<slot suffix>', {
      true: figma.instance('↳ <slot suffix>'),
    }),
    variant: figma.enum('variant', {
      filled: 'filled',
      outline: 'outline',
      text: 'text',
    }),
  },
});
