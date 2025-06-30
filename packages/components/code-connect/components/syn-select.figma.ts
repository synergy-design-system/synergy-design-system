import figma, { html } from '@figma/code-connect/html';
import type SynSelect from '../../src/components/select/select';
import type { ValidProperties } from '../core/types';

// Dropdown helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=4910-22093&m=dev', {
  example: ({
    defaultSlot,
  }) => html`${defaultSlot}`,
  props: {
    defaultSlot: figma.children('*'),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=4825-30354', {
  example: ({
    clearable,
    defaultSlot,
    disabled,
    helpText,
    label,
    multiple,
    open,
    prefixSlot,
    placeholder,
    size,
    suffixSlot,
    value,
  }) => html`
    <syn-select
      clearable=${clearable}
      disabled=${disabled}
      help-text=${helpText}
      label=${label}
      multiple=${multiple}
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
    </syn-select>
  `,
  imports: [
    'import { SynSelect } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-select--docs',
    },
  ],
  props: {
    clearable: figma.boolean('clearable'),
    defaultSlot: figma.children('_helper/dropdown/syn-select'),
    disabled: figma.boolean('disabled'),
    helpText: figma.boolean('help-text', {
      true: figma.string('└─ content/help-text'),
    }),
    label: figma.boolean('label', {
      true: figma.string('└─ content/label'),
    }),
    multiple: figma.boolean('multiple'),
    open: figma.boolean('open'),
    placeholder: figma.boolean('placeholder', {
      true: figma.string('*value'),
    }),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('└─ <slot prefix>'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('└─ <slot suffix>'),
    }),
    value: figma.string('*value'),
  } satisfies ValidProperties<SynSelect, ['default', 'prefix', 'suffix', 'suffix']>,
});
