// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1080-6566
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/button/button.component.ts
// component=SynButton
import figma from 'figma';
import type SynButton from '../../src/components/button/button.js';
import type { ValidProperties } from '../core/types.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('<slot label>') ? instance.getString('↳ label') : '',
  disabled: instance.getBoolean('disabled'),
  loading: instance.getBoolean('loading'),
  prefixSlot: instance.getBoolean('<slot-prefix>')
    ? instance.getInstanceSwap('↳ <slot-prefix>')?.executeTemplate().example
    : undefined,
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  suffixSlot: instance.getBoolean('<slot suffix>')
    ? instance.getInstanceSwap('↳ <slot suffix>')?.executeTemplate().example
    : undefined,
  variant: instance.getEnum('variant', {
    filled: 'filled',
    outline: 'outline',
    text: 'text',
  }) ?? 'outline',
} satisfies ValidProperties<SynButton, ['default', 'prefix', 'suffix']>;

export default {
  example: figma.code`
    <syn-button
      ${props.disabled ? 'disabled' : ''}
      size="${props.size}"
      ${props.loading ? 'loading' : ''}
      variant="${props.variant}"
    >
      ${props.defaultSlot}
      ${props.prefixSlot ? figma.code`<span slot="prefix">${props.prefixSlot}</span>` : undefined}
      ${props.suffixSlot ? figma.code`<span slot="suffix">${props.suffixSlot}</span>` : undefined}
    </syn-button>
  `,
  id: 'syn-button',
  imports: [
    "import '@synergy-design-system/components/components/button/button.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs',
    },
  ],
};
