// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17938-28299
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/dialog/dialog.component.ts
// component=SynDialog
import figma from 'figma';
import type SynDialog from '../../src/components/dialog/dialog.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('*content') ? renderChildren(instance, '_helper/syn-drawer/content') : undefined,
  footerSlot: instance.getBoolean('footer') ? renderChildren(instance, '_helper/syn-dialog/footer') : undefined,
  headerSlot: instance.getBoolean('*header') ? renderChildren(instance, '_helper/syn-drawer/header') : undefined,
  noHeader: !instance.getBoolean('*header'),
} satisfies ValidProperties<SynDialog, [
  'default',
  'header',
  'footer',
]>;
const {
  defaultSlot, footerSlot, headerSlot, noHeader,
} = props;

export default {
  example: figma.code`
    <syn-dialog
      open
      ${renderAttribute('no-header', noHeader)}
    >
      ${headerSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-dialog>
  `,
  id: 'syn-dialog',
  imports: [
    'import { SynDialog } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-dialog--docs',
    },
  ],
};
