// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=18458-27241
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/breadcrumb/breadcrumb.component.ts
// component=SynBreadcrumb
import figma from 'figma';
import type SynBreadcrumb from '../../src/components/breadcrumb/breadcrumb.js';
import type { ValidProperties } from '../core/types.js';
import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('level-1') ? renderChildren(instance, 'syn-breadcrumb-item') : undefined,
} satisfies ValidProperties<SynBreadcrumb>;
const { defaultSlot } = props;

export default {
  example: figma.code`
    <syn-breadcrumb
    >
      ${defaultSlot}
    </syn-breadcrumb>
  `,
  id: 'syn-breadcrumb',
  imports: [
    'import { SynBreadcrumb } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb--docs',
    },
  ],
};
