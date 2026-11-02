// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-44681
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tab-panel/tab-panel.component.ts
// component=SynTabPanel
import figma from 'figma';
import type SynTabPanel from '../../src/components/tab-panel/tab-panel.js';
import type { ValidProperties } from '../core/types.js';

const props = {
  defaultSlot: figma.code`
      <div>Replace this slot</div>
    `,
} satisfies ValidProperties<SynTabPanel>;
const { defaultSlot } = props;

export default {
  example: figma.code`
    <syn-tab-panel>
      ${defaultSlot}
    </syn-tab-panel>
  `,
  id: 'syn-tab-panel',
  imports: [
    'import { SynTabPanel } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab-panel--docs',
    },
  ],
};
