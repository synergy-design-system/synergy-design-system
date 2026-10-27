// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88547
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/accordion/accordion.component.ts
// component=SynAccordion
import figma from 'figma';
import type SynAccordion from '../../src/components/accordion/accordion.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  contained: instance.getBoolean('contained'),
  defaultSlot: instance.getBoolean('detail-1') ? renderChildren(instance, 'syn-details') : undefined,
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
  }) ?? 'medium',
} satisfies ValidProperties<SynAccordion>;
const { contained, defaultSlot, size } = props;

export default {
  example: figma.code`
    <syn-accordion
      ${renderAttribute('contained', contained)}
      ${renderAttribute('size', size)}
    >
      ${defaultSlot}
    </syn-accordion>
  `,
  id: 'syn-accordion',
  imports: [
    'import { SynAccordion } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs',
    },
  ],
};
