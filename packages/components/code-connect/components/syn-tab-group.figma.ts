// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-44793
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tab-group/tab-group.component.ts
// component=SynTabGroup
import figma from 'figma';
import type SynTabGroup from '../../src/components/tab-group/tab-group.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  contained: instance.getBoolean('contained'),
  defaultSlot: renderChildren(instance, '*'),
  placement: instance.getEnum('alignment', {
    end: 'end',
    start: 'start',
    top: 'top',
  }) ?? 'top',
  sharp: instance.getBoolean('sharp'),
} satisfies ValidProperties<SynTabGroup>;
const {
  contained, defaultSlot, placement, sharp,
} = props;

export default {
  example: figma.code`
    <syn-tab-group
      ${renderAttribute('contained', contained)}
      ${renderAttribute('placement', placement)}
      ${renderAttribute('sharp', sharp)}
    >
      ${defaultSlot}
    </syn-tab-group>
  `,
  id: 'syn-tab-group',
  imports: [
    'import { SynTabGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab-group--docs',
    },
  ],
};
