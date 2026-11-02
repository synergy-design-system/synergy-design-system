// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=42864-478896
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/header/header.component.ts
// component=SynHeader
import figma from 'figma';
import type SynHeader from '../../src/components/header/header.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  burgerMenu: instance.getBoolean('burger-menu') ? 'closed' : 'hidden',
  labelSlot: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
  logoSlot: instance.getInstanceSwap('\u21B3 <slot (logo)>')?.executeTemplate().example,
  metaNavigationSlot: renderChildren(instance, 'syn-icon-button'),
  navigationSlot: instance.getBoolean('*navigation') ? instance.getInstanceSwap('\u21B3 <slot nav>')?.executeTemplate().example : undefined,
  sticky: instance.getBoolean('sticky'),
} satisfies ValidProperties<SynHeader, [
  'label',
  'logo',
  'navigation',
  'metaNavigation',
  'sticky',
]>;
const {
  burgerMenu, labelSlot, logoSlot, metaNavigationSlot, navigationSlot,
} = props;

export default {
  example: figma.code`
    <syn-header
      ${renderAttribute('burger-menu', burgerMenu)}
    >
      <div slot="logo">${logoSlot}</div>
      <div slot="label">${labelSlot}</div>
      <nav slot="meta-navigation">${metaNavigationSlot}</nav>
      <nav slot="navigation">${navigationSlot}</nav>
    </syn-header>
  `,
  id: 'syn-header',
  imports: [
    'import { SynHeader } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs',
    },
  ],
};
