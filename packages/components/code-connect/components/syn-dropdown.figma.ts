// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=11573-375949
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/dropdown/dropdown.component.ts
// component=SynDropdown
import figma from 'figma';
import type SynDropdown from '../../src/components/dropdown/dropdown.js';
import type { ValidProperties } from '../core/types.js';
import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '*'),
} satisfies ValidProperties<SynDropdown>;
const { defaultSlot } = props;

export default {
  example: figma.code`
    <syn-dropdown>
      ${defaultSlot}
    </syn-dropdown>
  `,
  id: 'syn-dropdown',
  imports: [
    'import { SynDropdown } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-dropdown--docs',
    },
  ],
};
