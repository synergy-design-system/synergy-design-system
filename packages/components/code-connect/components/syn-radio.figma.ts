// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1345-21578
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/radio/radio.component.ts
// component=SynRadio
import figma from 'figma';
import type SynRadio from '../../src/components/radio/radio.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getInstanceSwap('\u21B3 <slot (default)>')?.executeTemplate().example,
  disabled: instance.getBoolean('disabled'),
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynRadio>;
const {
  defaultSlot, disabled, readonly, size,
} = props;

export default {
  example: figma.code`
    <syn-radio
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('readonly', readonly)}
      ${renderAttribute('size', size)}
    >
      ${defaultSlot}
    </syn-radio>
  `,
  id: 'syn-radio',
  imports: [
    'import { SynRadio } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio--docs',
    },
  ],
};
