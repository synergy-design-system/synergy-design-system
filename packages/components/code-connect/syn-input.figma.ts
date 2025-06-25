import figma, { html } from '@figma/code-connect/html';
import type SynInput from '../src/components/input/input.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=661-61526', {
  example: ({
    clearable,
    disabled,
    helpText,
    label,
    size,
    value,
    placeholder,
    prefixSlot,
    readonly,
    suffixSlot,
    type,
  }) => html`
    <syn-input
      clearable=${clearable}
      disabled=${disabled}
      help-text=${helpText}
      label=${label}
      size=${size}
      value=${value}
      readonly=${readonly}
      placeholder=${placeholder}
      type=${type}
    >
      <span slot="prefix">
        ${prefixSlot}
      </span>
      <span slot="suffix">
        ${suffixSlot}
      </span>
    </syn-input>
  `,
  imports: [
    'import { SynInput } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-input--docs',
    },
  ],
  props: {
    disabled: figma.boolean('disabled'),
    clearable: figma.boolean('clearable'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    label: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    }),
    placeholder: figma.boolean('placeholder', {
      true: figma.string('*value'),
    }),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('↳ <slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('↳ <slot suffix>'),
    }),
    readonly: figma.boolean('readonly'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    value: figma.string('*value'),
    type: figma.boolean('stepper', {
      true: 'number',
      false: 'text',
    }),
  } satisfies ValidProperties<SynInput, ['prefix', 'suffix', 'suffix']>,
});
