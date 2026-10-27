// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-38412
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/range-tick/range-tick.component.ts
// component=SynRangeTick
import figma from 'figma';
import type SynRangeTick from '../../src/components/range-tick/range-tick.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('*label') ? instance.getInstanceSwap('<slot (default)>')?.executeTemplate().example : undefined,
  subdivision: instance.getBoolean('subdivision'),
} satisfies ValidProperties<SynRangeTick>;
const { defaultSlot, subdivision } = props;

export default {
  example: figma.code`
    <syn-range-tick
      ${renderAttribute('subdivision', subdivision)}
    >
      ${defaultSlot}
    </syn-range-tick>
  `,
  id: 'syn-range-tick',
  imports: [
    'import { SynRangeTick } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-range-tick--docs',
    },
  ],
};
