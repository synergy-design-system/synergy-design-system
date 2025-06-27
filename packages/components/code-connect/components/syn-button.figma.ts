import figma, { html } from '@figma/code-connect/html';
import type SynButton from '../src/components/button/button.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - prefix and suffix slots should allow to set instances with slot="prefix" and slot="suffix"
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1080-6566&t=QM5ExbII4BRhqFoo-4', {
  example: ({
    defaultSlot,
    disabled,
    loading,
    prefixSlot,
    size,
    suffixSlot,
    variant,
  }) => html`
    <syn-button
      disabled=${disabled}
      size=${size}
      loading=${loading}
      variant=${variant}
    >
      ${defaultSlot}
      <span slot="prefix">${prefixSlot}</span>
      <span slot="suffix">${suffixSlot}</span>
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
    defaultSlot: figma.boolean('<slot label>', {
      true: figma.string('↳ label'),
    }),
    disabled: figma.boolean('disabled'),
    loading: figma.boolean('loading'),
    prefixSlot: figma.boolean('<slot-prefix>', {
      true: figma.instance('↳ <slot-prefix>'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    suffixSlot: figma.boolean('<slot suffix>', {
      true: figma.instance('↳ <slot suffix>'),
    }),
    variant: figma.enum('variant', {
      filled: 'filled',
      outline: 'outline',
      text: 'text',
    }),
  } satisfies ValidProperties<SynButton, ['default', 'prefix', 'suffix']>,
});
