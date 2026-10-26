// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=44847-125816
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/card/card.component.ts
// component=SynCard
import figma from 'figma';
import type SynCard from '../../src/components/card/card.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, '_helper/syn-card/base'),
  footerSlot: renderChildren(instance, '_helper/syn-card/footer'),
  headerSlot: renderChildren(instance, '_helper/syn-cards/header'),
  imageSlot: instance.getBoolean('image') ? instance.getInstanceSwap('<image slot>')?.executeTemplate().example : undefined,
  sharp: instance.getBoolean('sharp'),
} satisfies ValidProperties<SynCard, [
  'default',
  'header',
  'footer',
  'image',
]>;
const {
  defaultSlot, footerSlot, headerSlot, imageSlot, sharp,
} = props;

export default {
  example: figma.code`
    <syn-card
      ${renderAttribute('sharp', sharp)}
    >
      ${imageSlot}
      ${headerSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-card>
  `,
  id: 'syn-card',
  imports: [
    'import { SynCard } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-card--docs',
    },
  ],
};
