// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=30344-112405
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/optgroup/optgroup.component.ts
// component=SynOptgroup
import figma from 'figma';
import type SynOptgroup from '../../src/components/optgroup/optgroup.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  disabled: instance.getBoolean('disabled'),
  label: instance.getString('*value'),
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u21B3 <slot prefix>')?.executeTemplate().example : undefined,
  style: instance.getBoolean('*divider') ? undefined : '--display-divider: none;',
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u21B3 <slot suffix>')?.executeTemplate().example : undefined,
} satisfies ValidProperties<SynOptgroup, [
  'default',
  'prefix',
  'suffix',
]>;
const {
  disabled, label, prefixSlot, style, suffixSlot,
} = props;

export default {
  example: figma.code`
    <syn-optgroup
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('label', label)}
      ${renderAttribute('style', style)}
    >
      <span slot="prefix">${prefixSlot}</span>
      <span slot="suffix">${suffixSlot}</span>
    </syn-optgroup>
  `,
  id: 'syn-optgroup',
  imports: [
    'import { SynOptGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-opt-group--docs',
    },
  ],
};
