// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-36003
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/range-tick/range-tick.component.ts
// component=SynRangeTick
import figma from 'figma';

import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '*'),
};
const { defaultSlot } = props;

export default {
  example: figma.code`
    <div style="justify-content: space-between; flex-direction: row; display: flex;">
      ${defaultSlot}
    </div>
  `,
  id: 'syn-range-tick-helper-1',
};
