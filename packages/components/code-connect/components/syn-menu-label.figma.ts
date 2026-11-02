// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=10666-9080
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/menu-label/menu-label.component.ts
// component=SynMenuLabel
import figma from 'figma';
import type SynMenuLabel from '../../src/components/menu-label/menu-label.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('*value'),
  style: instance.getBoolean('*divider') ? undefined : '--display-divider: none;',
} satisfies ValidProperties<SynMenuLabel>;
const { defaultSlot, style } = props;

export default {
  example: figma.code`
    <syn-menu-label
      ${renderAttribute('style', style)}
    >
      ${defaultSlot}
    </syn-menu-label>
  `,
  id: 'syn-menu-label',
  imports: [
    'import { SynMenuLabel } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu-label--docs',
    },
  ],
};
