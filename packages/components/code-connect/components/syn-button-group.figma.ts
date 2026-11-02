// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=45597-318030
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/button-group/button-group.component.ts
// component=SynButtonGroup
import figma from 'figma';
import type SynButtonGroup from '../../src/components/button-group/button-group.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.findConnectedInstances(child => child.codeConnectId() === 'syn-button', {
    traverseInstances: true,
  }).map(child => child.executeTemplate().example),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    'medium (default)': 'medium',
    small: 'small',
  }) ?? 'medium',
  variant: instance.getEnum('variant', {
    filled: 'filled',
    outline: 'outline',
  }) ?? 'outline',
} satisfies ValidProperties<SynButtonGroup>;

export default {
  example: figma.code`
    <syn-button-group
      ${renderAttribute('size', props.size)}
      ${renderAttribute('variant', props.variant)}
    >
      ${props.defaultSlot}
    </syn-button-group>
  `,
  id: 'syn-button-group',
  imports: [
    "import '@synergy-design-system/components/components/button-group/button-group.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-button-group--docs',
    },
  ],
};
