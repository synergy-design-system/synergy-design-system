// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7949
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/drawer/drawer.component.ts
// component=SynDrawer
import figma from 'figma';

import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '*'),
};
const { defaultSlot } = props;

export default {
  example: figma.code`
    <div slot="footer">
      ${defaultSlot}
    </div>
  `,
  id: 'syn-drawer-helper-3',
  imports: [],
  links: [],
};
