import figma, { html } from '@figma/code-connect/html';
import type SynMenuItem from '../../src/components/menu-item/menu-item.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=10514-9627', {
  example: ({
    checked,
    defaultSlot,
    disabled,
    loading,
    prefixSlot,
    suffixSlot,
    type,
  }) => html`
    <syn-menu-item
      checked=${checked}
      disabled=${disabled}
      loading=${loading}
      type=${type}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-menu-item>
  `,
  imports: [
    'import { SynMenuItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu-item--docs',
    },
  ],
  props: {
    checked: figma.boolean('select'),
    defaultSlot: figma.string('*value'),
    disabled: figma.boolean('disabled'),
    loading: figma.boolean('loading'),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('<slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('<slot suffix>'),
    }),
    type: figma.boolean('select', {
      true: 'checkbox',
    }),
  } satisfies ValidProperties<SynMenuItem, ['default', 'prefix', 'suffix']>,
});
