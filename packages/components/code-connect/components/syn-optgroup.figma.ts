import figma, { html } from '@figma/code-connect/html';
import type SynOptgroup from '../../src/components/optgroup/optgroup.js';
import type { ValidProperties } from '../core/types';

/**
 * @todos
 * - The component does not work properly because it does not allow nesting in figma (e.g. it should support the defaultSlot in Figma).
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=30344-112405', {
  example: ({
    disabled,
    label,
    prefixSlot,
    style,
    suffixSlot,
  }) => html`
    <syn-optgroup
      disabled=${disabled}
      label=${label}
      style=${style}
    >
      <span slot="prefix">${prefixSlot}</span>
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
    disabled: figma.boolean('disabled'),
    label: figma.string('*value'),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('↳ <slot prefix>'),
    }),
    style: figma.boolean('*divider', {
      false: html`--display-divider: none;`,
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('↳ <slot suffix>'),
    }),
  } satisfies ValidProperties<SynOptgroup, ['default', 'prefix', 'suffix']>,
});
