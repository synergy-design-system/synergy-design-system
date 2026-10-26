// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-47184
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tab/tab.component.ts
// component=SynTab
import figma from 'figma';
import type SynTab from '../../src/components/tab/tab.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  closable: instance.getBoolean('close'),
  defaultSlot: instance.getBoolean('<slot label>') ? instance.getString('\u21B3*value') : undefined,
  disabled: instance.getBoolean('disabled'),
} satisfies ValidProperties<SynTab>;
const { closable, defaultSlot, disabled } = props;

export default {
  example: figma.code`
    <syn-tab
      ${renderAttribute('closable', closable)}
      ${renderAttribute('disabled', disabled)}
    >
      ${defaultSlot}
    </syn-tab>
  `,
  id: 'syn-tab',
  imports: [
    'import { SynTab } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs',
    },
  ],
};
