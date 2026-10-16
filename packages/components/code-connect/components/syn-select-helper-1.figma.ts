// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=4910-22093&m=dev
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/select/select.component.ts
// component=SynSelect
import figma from 'figma';

import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '*'),
};
const { defaultSlot } = props;

export default {
  example: figma.code`${defaultSlot}`,
  id: 'syn-select-helper-1',
};
