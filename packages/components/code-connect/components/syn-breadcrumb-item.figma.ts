// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=18458-27218
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/breadcrumb-item/breadcrumb-item.component.ts
// component=SynBreadcrumbItem
import figma from 'figma';
import type SynBreadcrumbItem from '../../src/components/breadcrumb-item/breadcrumb-item.js';
import type { ValidProperties } from '../core/types.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('\u21B3 content/label'),
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('<slot prefix>')?.executeTemplate().example : undefined,
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('<slot suffix>')?.executeTemplate().example : undefined,
} satisfies ValidProperties<SynBreadcrumbItem, [
  'default',
  'prefix',
  'suffix',
]>;
const { defaultSlot, prefixSlot, suffixSlot } = props;

export default {
  example: figma.code`
    <syn-breadcrumb-item
    >
      ${defaultSlot}
      <span slot="prefix">${prefixSlot}</span>
      <span slot="suffix">${suffixSlot}</span>
    </syn-breadcrumb-item>
  `,
  id: 'syn-breadcrumb-item',
  imports: [
    'import { SynBreadcrumbItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb-item--docs',
    },
  ],
};
