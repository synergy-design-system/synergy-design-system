// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=30345-113913
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/option/option.component.ts
// component=SynOption
import figma from 'figma';
import type SynOption from '../../src/components/option/option.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('*value'),
  disabled: instance.getBoolean('disabled'),
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u21B3 <slot prefix>')?.executeTemplate().example : undefined,
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u21B3 <slot suffix>')?.executeTemplate().example : undefined,
} satisfies ValidProperties<SynOption, [
  'default',
  'prefix',
  'suffix',
]>;
const {
  defaultSlot, disabled, prefixSlot, suffixSlot,
} = props;

export default {
  example: figma.code`
    <syn-option
      ${renderAttribute('disabled', disabled)}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-option>
  `,
  id: 'syn-option',
  imports: [
    'import { SynOption } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-option--docs',
    },
  ],
};
