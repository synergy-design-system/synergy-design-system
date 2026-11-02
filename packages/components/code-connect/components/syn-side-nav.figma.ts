// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-15033&m=dev
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/side-nav/side-nav.component.ts
// component=SynSideNav
import figma from 'figma';
import type SynSideNav from '../../src/components/side-nav/side-nav.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, 'helper/syn-side-nav/menu'),
  open: instance.getBoolean('open'),
  variant: instance.getEnum('variant', {
    default: 'default',
    rail: 'rail',
    sticky: 'sticky',
  }) ?? 'default',
} satisfies ValidProperties<SynSideNav>;
const { defaultSlot, open, variant } = props;

export default {
  example: figma.code`
    <syn-side-nav
      ${renderAttribute('open', open)}
      ${renderAttribute('variant', variant)}
    >
      ${defaultSlot}
    </syn-side-nav>
  `,
  id: 'syn-side-nav',
  imports: [
    'import { SynSideNav } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-side-nav--docs',
    },
  ],
};
