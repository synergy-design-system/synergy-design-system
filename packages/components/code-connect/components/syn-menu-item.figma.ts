// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=10514-9627
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/menu-item/menu-item.component.ts
// component=SynMenuItem
import figma from 'figma';
import type SynMenuItem from '../../src/components/menu-item/menu-item.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  checked: instance.getBoolean('select'),
  defaultSlot: instance.getString('*value'),
  disabled: instance.getBoolean('disabled'),
  loading: instance.getBoolean('loading'),
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('<slot prefix>')?.executeTemplate().example : undefined,
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('<slot suffix>')?.executeTemplate().example : undefined,
  type: instance.getBoolean('select') ? 'checkbox' : undefined,
} satisfies ValidProperties<SynMenuItem, [
  'default',
  'prefix',
  'suffix',
]>;
const {
  checked, defaultSlot, disabled, loading, prefixSlot, suffixSlot, type,
} = props;

export default {
  example: figma.code`
    <syn-menu-item
      ${renderAttribute('checked', checked)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('loading', loading)}
      ${renderAttribute('type', type)}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-menu-item>
  `,
  id: 'syn-menu-item',
  imports: [
    'import { SynMenuItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu-item--docs',
    },
  ],
};
