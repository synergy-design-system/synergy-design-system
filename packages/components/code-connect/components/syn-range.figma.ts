import figma, { html } from '@figma/code-connect/html';
import type SynRange from '../../src/components/range/range.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-36015', {
  example: ({
    disabled,
    helpText,
    label,
    size,
    ticksSlot,
    value,
    prefixSlot,
    suffixSlot,
  }) => html`
    <syn-range
      disabled=${disabled}
      help-text=${helpText}
      label=${label}
      size=${size}
      value=${value}
    >
      <span slot="prefix">
        ${prefixSlot}
      </span>
      <span slot="suffix">
        ${suffixSlot}
      </span>
      <nav slot="ticks">
        ${ticksSlot}
      </nav>
    </syn-range>
  `,
  imports: [
    'import { SynRange } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs',
    },
  ],
  props: {
    disabled: figma.boolean('disabled'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    label: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    }),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('↳ <slot prefix>'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('↳ <slot suffix>'),
    }),
    ticksSlot: figma.boolean('ticks', {
      true: figma.children('_helper/syn-range/ticks'),
    }),
    value: figma.boolean('multi-thumb', {
      false: html`50`,
      true: html`0 50`,
    }),
  } satisfies ValidProperties<SynRange, ['prefix', 'suffix', 'suffix', 'ticks']>,
});
