// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=11516-365094
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/menu/menu.component.ts
// component=SynMenu
import figma from 'figma';
import type SynMenu from '../../src/components/menu/menu.js';
import type { ValidProperties } from '../core/types.js';
import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, 'syn-menu-item'),
} satisfies ValidProperties<SynMenu>;
const { defaultSlot } = props;

export default {
  example: figma.code`
    <syn-menu>
      ${defaultSlot}
    </syn-menu>
  `,
  id: 'syn-menu',
  imports: [
    'import { SynMenu } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu--docs',
    },
  ],
};
