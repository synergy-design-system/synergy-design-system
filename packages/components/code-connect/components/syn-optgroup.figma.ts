import figma, { html } from '@figma/code-connect/html';
import type SynOptgroup from '../src/components/optgroup/optgroup.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=30344-112405', {
  example: ({
    defaultSlot,
    disabled,
    prefixSlot,
    suffixSlot,
    style,
  }) => html`
    <syn-optgroup
      disabled=${disabled}
      style=${style}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-optgroup>
  `,
  imports: [
    'import { SynOptGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-opt-group--docs',
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
    style: figma.boolean('*divider', {
      false: html`--display-divider: none;`,
    }),
  } satisfies ValidProperties<SynOptgroup, ['default', 'prefix', 'suffix']>,
});
