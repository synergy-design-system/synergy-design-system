// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2842-16750
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tag/tag.component.ts
// component=SynTag
import figma from 'figma';
import type SynTag from '../../src/components/tag/tag.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getInstanceSwap('<slot (default)>')?.executeTemplate().example,
  iconSlot: instance.getBoolean('*icon') ? instance.getInstanceSwap('\u21B3 icon')?.executeTemplate().example : undefined,
  removable: instance.getBoolean('removable'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynTag, [
  'default',
  'icon',
]>;
const {
  defaultSlot, iconSlot, removable, size,
} = props;

export default {
  example: figma.code`
    <syn-tag
      ${renderAttribute('removable', removable)}
      ${renderAttribute('size', size)}
    >
      ${iconSlot}
      ${defaultSlot}
    </syn-tag>
  `,
  id: 'syn-tag',
  imports: [
    'import { SynTag } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tag--docs',
    },
  ],
};
