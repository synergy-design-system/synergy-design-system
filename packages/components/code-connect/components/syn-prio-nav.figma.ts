// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-10982
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/prio-nav/prio-nav.component.ts
// component=SynPrioNav
import figma from 'figma';
import type SynPrioNav from '../../src/components/prio-nav/prio-nav.js';
import type { ValidProperties } from '../core/types.js';
import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, 'syn-nav-item'),
} satisfies ValidProperties<SynPrioNav>;
const { defaultSlot } = props;

export default {
  example: figma.code`
    <syn-prio-nav>
      ${defaultSlot}
    </syn-prio-nav>
  `,
  id: 'syn-prio-nav',
  imports: [
    'import { SynPrioNav } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs',
    },
  ],
};
