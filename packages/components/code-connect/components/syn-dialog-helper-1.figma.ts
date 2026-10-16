// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28313
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/dialog/dialog.component.ts
// component=SynDialog
import figma from 'figma';

import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '*'),
};
const { defaultSlot } = props;

export default {
  example: figma.code`
    ${defaultSlot}
  `,
  id: 'syn-dialog-helper-1',
};
