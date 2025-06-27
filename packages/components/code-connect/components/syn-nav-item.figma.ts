import figma, { html } from '@figma/code-connect/html';
import type SynNavItem from '../src/components/nav-item/nav-item.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-10922', {
  example: ({
    current,
    defaultSlot,
    disabled,
    horizontal,
    prefixSlot,
    suffixSlot,
    style,
  }) => html`
    <syn-nav-item
      current=${current}
      disabled=${disabled}
      horizontal=${horizontal}
      style=${style}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-nav-item>
  `,
  imports: [
    'import { SynNavItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-nav-item--docs',
    },
  ],
  props: {
    current: figma.boolean('current'),
    defaultSlot: figma.boolean('<slot label>', {
      true: figma.string('↳*value'),
    }),
    disabled: figma.boolean('disabled'),
    horizontal: figma.boolean('horizontal'),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('↳ <slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('↳ <slot suffix>'),
    }),
    style: figma.boolean('nest', {
      true: figma.boolean('↳ nest', {
        false: html`--indentation: 1`,
        true: html`--indentation: 2`,
      }),
    }),
  } satisfies ValidProperties<SynNavItem, ['default', 'prefix', 'suffix']>,
});
