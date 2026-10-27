// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7953
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/drawer/drawer.component.ts
// component=SynDrawer
import figma from 'figma';
import type SynDrawer from '../../src/components/drawer/drawer.js';
import type { ValidProperties } from '../core/types.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('*content') ? instance.getInstanceSwap('\u21B3 *<slot-content>')?.executeTemplate().example : undefined,
  footerSlot: instance.getBoolean('footer') ? instance.getInstanceSwap('\u21B3 slot-footer')?.executeTemplate().example : undefined,
  headerActionsSlot: instance.getBoolean('header-actions') ? figma.code`
        <syn-icon-button name="wallpaper" label="Action" slot="header-actions"></syn-icon-button>
      ` : undefined,
  headerSlot: instance.getBoolean('header') ? instance.getInstanceSwap('\u21B3 <slot-header>')?.executeTemplate().example : undefined,
} satisfies ValidProperties<SynDrawer, [
  'default',
  'header',
  'headerActions',
  'footer',
]>;
const {
  defaultSlot, footerSlot, headerActionsSlot, headerSlot,
} = props;

export default {
  example: figma.code`
    <syn-drawer>
      ${headerSlot}
      ${headerActionsSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-drawer>
  `,
  id: 'syn-drawer',
  imports: [
    'import { SynDrawer } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-drawer--docs',
    },
  ],
};
