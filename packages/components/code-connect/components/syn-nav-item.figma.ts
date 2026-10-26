// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-10922
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/nav-item/nav-item.component.ts
// component=SynNavItem
import figma from 'figma';
import type SynNavItem from '../../src/components/nav-item/nav-item.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  current: instance.getBoolean('current'),
  defaultSlot: instance.getBoolean('<slot label>') ? instance.getString('\u21B3*value') : undefined,
  disabled: instance.getBoolean('disabled'),
  horizontal: instance.getBoolean('horizontal'),
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u21B3 <slot prefix>')?.executeTemplate().example : undefined,
  style: instance.getBoolean('nest') ? instance.getBoolean('\u21B3 nest', {
    false: '--indentation: 1',
    true: '--indentation: 2',
  }) : undefined,
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u21B3 <slot suffix>')?.executeTemplate().example : undefined,
} satisfies ValidProperties<SynNavItem, [
  'default',
  'prefix',
  'suffix',
]>;
const {
  current, defaultSlot, disabled, horizontal, prefixSlot, style, suffixSlot,
} = props;

export default {
  example: figma.code`
    <syn-nav-item
      ${renderAttribute('current', current)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('horizontal', horizontal)}
      ${renderAttribute('style', style)}
    >
      <span slot="prefix">${prefixSlot}</span>
      ${defaultSlot}
      <span slot="suffix">${suffixSlot}</span>
    </syn-nav-item>
  `,
  id: 'syn-nav-item',
  imports: [
    'import { SynNavItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-nav-item--docs',
    },
  ],
};
