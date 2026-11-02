// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=47863-29894
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/radio-button/radio-button.component.ts
// component=SynRadioButton
import figma from 'figma';
import type SynRadioButton from '../../src/components/radio-button/radio-button.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('<slot-default>') ? instance.getString('↳ <slot default>') : '',
  disabled: instance.getBoolean('disabled'),
  prefixSlot: instance.getBoolean('<slot-prefix>')
    ? instance.getSlot('↳ <slot prefix>')?.connectedInstances.map(child => child.executeTemplate().example)
    : undefined,
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    'medium (default)': 'medium',
    small: 'small',
  }) ?? 'medium',
  suffixSlot: instance.getBoolean('<slot-suffix>')
    ? instance.getSlot('↳ <slot suffix>')?.connectedInstances.map(child => child.executeTemplate().example)
    : undefined,
  value: instance.id,
} satisfies ValidProperties<SynRadioButton, ['default', 'prefix', 'suffix']>;

export default {
  example: figma.code`
    <syn-radio-button
      ${renderAttribute('disabled', props.disabled)}
      ${renderAttribute('readonly', props.readonly)}
      ${renderAttribute('size', props.size)}
      ${renderAttribute('value', props.value)}
    >
      ${props.prefixSlot ? figma.code`<span slot="prefix">${props.prefixSlot}</span>` : undefined}
      ${props.defaultSlot}
      ${props.suffixSlot ? figma.code`<span slot="suffix">${props.suffixSlot}</span>` : undefined}
    </syn-radio-button>
  `,
  id: 'syn-radio-button',
  imports: [
    "import '@synergy-design-system/components/components/radio-button/radio-button.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio-button--docs',
    },
  ],
};
