// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=661-61526
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/input/input.component.ts
// component=SynInput
import figma from 'figma';
import type SynInput from '../../src/components/input/input.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  clearable: instance.getBoolean('clearable'),
  disabled: instance.getBoolean('disabled'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  label: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
  placeholder: instance.getBoolean('placeholder') ? instance.getString('*value') : undefined,
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u21B3 <slot prefix>')?.executeTemplate().example : undefined,
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u21B3 <slot suffix>')?.executeTemplate().example : undefined,
  type: instance.getBoolean('stepper') ? 'number' : 'text',
  value: instance.getString('*value'),
} satisfies ValidProperties<SynInput, [
  'prefix',
  'suffix',
  'suffix',
]>;
const {
  clearable, disabled, helpText, label, size, value, placeholder, prefixSlot, readonly, suffixSlot, type,
} = props;

export default {
  example: figma.code`
    <syn-input
      ${renderAttribute('clearable', clearable)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('label', label)}
      ${renderAttribute('size', size)}
      ${renderAttribute('value', value)}
      ${renderAttribute('readonly', readonly)}
      ${renderAttribute('placeholder', placeholder)}
      ${renderAttribute('type', type)}
    >
      <span slot="prefix">
        ${prefixSlot}
      </span>
      <span slot="suffix">
        ${suffixSlot}
      </span>
    </syn-input>
  `,
  id: 'syn-input',
  imports: [
    'import { SynInput } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-input--docs',
    },
  ],
};
