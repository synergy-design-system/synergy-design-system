// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16193-20867
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/progress-ring/progress-ring.component.ts
// component=SynProgressRing
import figma from 'figma';
import type SynProgressRing from '../../src/components/progress-ring/progress-ring.js';
import type { ValidProperties } from '../core/types.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('<slot>'),
  value: 25,
} satisfies ValidProperties<SynProgressRing>;
const { defaultSlot, value } = props;

export default {
  example: figma.code`
    <syn-progress-bar
      value="${value}"
    >
      ${defaultSlot}
    </syn-progress-bar>
  `,
  id: 'syn-progress-ring',
  imports: [
    'import { SynProgressRing } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-progress-ring--docs',
    },
  ],
};
