// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=26894-38120
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/combobox/combobox.component.ts
// component=SynCombobox
import figma from 'figma';
import type SynCombobox from '../../src/components/combobox/combobox.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  clearable: instance.getBoolean('clearable'),
  defaultSlot: renderChildren(instance, '_helper/dropdown/syn-combobox'),
  disabled: instance.getBoolean('disabled'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u2514\u2500 content/help-text') : undefined,
  label: instance.getBoolean('label') ? instance.getString('\u2514\u2500 content/label') : undefined,
  multiple: instance.getBoolean('multiple'),
  open: instance.getBoolean('open'),
  placeholder: instance.getBoolean('placeholder') ? instance.getString('*value') : undefined,
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u2514\u2500 <slot prefix>')?.executeTemplate().example : undefined,
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u2514\u2500 <slot suffix>')?.executeTemplate().example : undefined,
  value: instance.getString('*value'),
} satisfies ValidProperties<SynCombobox, [
  'default',
  'prefix',
  'suffix',
  'suffix',
]>;
const {
  clearable, defaultSlot, disabled, helpText, label, multiple, open, prefixSlot, placeholder, size, suffixSlot, value,
} = props;

export default {
  example: figma.code`
    <syn-combobox
      ${renderAttribute('clearable', clearable)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('label', label)}
      ${renderAttribute('multiple', multiple)}
      ${renderAttribute('open', open)}
      ${renderAttribute('placeholder', placeholder)}
      ${renderAttribute('size', size)}
      ${renderAttribute('value', value)}
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
  id: 'syn-combobox',
  imports: [
    'import { SynCombobox } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-combobox--docs',
    },
  ],
};
