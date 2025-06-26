import figma, { html } from '@figma/code-connect/html';
import type SynOption from '../src/components/option/option.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=30345-113913', {
  example: ({
    defaultSlot,
    disabled,
    prefixSlot,
    suffixSlot,
  }) => html`
    <syn-option
      disabled=${disabled}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-option>
  `,
  imports: [
    'import { SynOption } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-option--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('*value'),
    disabled: figma.boolean('disabled'),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('↳ <slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('↳ <slot suffix>'),
    }),
  } satisfies ValidProperties<SynOption, ['default', 'prefix', 'suffix']>,
});
