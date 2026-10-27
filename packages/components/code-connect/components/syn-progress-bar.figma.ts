// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16209-20856
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/progress-bar/progress-bar.component.ts
// component=SynProgressBar
import figma from 'figma';
import type SynProgressBar from '../../src/components/progress-bar/progress-bar.js';
import type { ValidProperties } from '../core/types.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('<slot>'),
  indeterminate: instance.getBoolean('indeterminate'),
  value: instance.getBoolean('indeterminate') ? undefined : 30,
} satisfies ValidProperties<SynProgressBar>;
const { defaultSlot, indeterminate, value } = props;

export default {
  example: figma.code`
    <syn-progress-bar
      indeterminate="${indeterminate}"
      value="${value}"
    >
      ${defaultSlot}
    </syn-progress-bar>
  `,
  id: 'syn-progress-bar',
  imports: [
    'import { SynProgressBar } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-progress-bar--docs',
    },
  ],
};
