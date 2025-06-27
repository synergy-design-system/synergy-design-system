import figma, { html } from '@figma/code-connect/html';
import type SynCombobox from '../src/components/combobox/combobox.js';
import type { ValidProperties } from './core/types';

// Combobox helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=26894-38223', {
  example: ({
    defaultSlot,
  }) => html`${defaultSlot}`,
  props: {
    defaultSlot: figma.children('*'),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=26894-38120', {
  example: ({
    clearable,
    defaultSlot,
    disabled,
    helpText,
    label,
    open,
    prefixSlot,
    placeholder,
    size,
    suffixSlot,
    value,
  }) => html`
    <syn-combobox
      clearable=${clearable}
      disabled=${disabled}
      help-text=${helpText}
      label=${label}
      open=${open}
      placeholder=${placeholder}
      size=${size}
      value=${value}
    >
      <span slot="prefix">
        ${prefixSlot}
      </span>
      ${defaultSlot}
      <span slot="suffix">
        ${suffixSlot}
      </span>
    </syn-combobox>
  `,
  imports: [
    'import { SynCombobox } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-combobox--docs',
    },
  ],
  props: {
    clearable: figma.boolean('clearable'),
    defaultSlot: figma.children('_helper/dropdown/syn-combobox'),
    disabled: figma.boolean('disabled'),
    helpText: figma.boolean('help-text', {
      true: figma.string('└─ content/help-text'),
    }),
    label: figma.boolean('label', {
      true: figma.string('└─ content/label'),
    }),
    open: figma.boolean('open'),
    placeholder: figma.boolean('placeholder', {
      true: figma.string('*value'),
    }),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('└─ <slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('└─ <slot suffix>'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    value: figma.string('*value'),
  } satisfies ValidProperties<SynCombobox, ['default', 'prefix', 'suffix', 'suffix']>,
});
