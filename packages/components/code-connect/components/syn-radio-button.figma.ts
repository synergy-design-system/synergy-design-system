// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=47863-30109
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/radio-button/radio-button.component.ts
// component=SynRadioButton
import figma from 'figma';
import type SynRadioGroup from '../../src/components/radio-group/radio-group.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const buttons = instance.getSlot('<slot default>')?.connectedInstances ?? [];
const selected = buttons.find(button => button.getEnum('state', {
  selected: true,
  unselected: false,
}) ?? false);
const props = {
  defaultSlot: buttons.map(child => child.executeTemplate().example),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  value: selected?.id,
} satisfies ValidProperties<SynRadioGroup>;

export default {
  example: figma.code`
    <syn-radio-group
      ${renderAttribute('size', props.size)}
      ${renderAttribute('value', props.value)}
    >
      ${props.defaultSlot}
    </syn-radio-group>
  `,
  id: 'syn-radio-button-group',
  imports: [
    "import '@synergy-design-system/components/components/radio-group/radio-group.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio-button--docs',
    },
  ],
};
