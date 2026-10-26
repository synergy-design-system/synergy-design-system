// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88398
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/details/details.component.ts
// component=SynDetails
import figma from 'figma';
import type SynDetails from '../../src/components/details/details.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  contained: instance.getBoolean('contained'),
  defaultSlot: instance.getInstanceSwap('<content slot>')?.executeTemplate().example,
  disabled: instance.getBoolean('disabled'),
  open: instance.getBoolean('open'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
  }) ?? 'medium',
  summary: instance.getString('summary'),
} satisfies ValidProperties<SynDetails>;
const {
  contained, defaultSlot, disabled, open, size, summary,
} = props;

export default {
  example: figma.code`
    <syn-details
      ${renderAttribute('contained', contained)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('open', open)}
      ${renderAttribute('size', size)}
      ${renderAttribute('summary', summary)}
    >
      ${defaultSlot}
    </syn-details>
  `,
  id: 'syn-details',
  imports: [
    'import { SynDetails } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-details--docs',
    },
  ],
};
