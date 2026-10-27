// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2190-4038
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/switch/switch.component.ts
// component=SynSwitch
import figma from 'figma';
import type SynSwitch from '../../src/components/switch/switch.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  checked: instance.getBoolean('selected'),
  defaultSlot: instance.getBoolean('*with label') ? instance.getInstanceSwap('\u21B3 <slot (default)>')?.executeTemplate().example : undefined,
  disabled: instance.getBoolean('disabled'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynSwitch>;
const {
  checked, defaultSlot, disabled, helpText, readonly, size,
} = props;

export default {
  example: figma.code`
    <syn-switch
      ${renderAttribute('checked', checked)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('readonly', readonly)}
      ${renderAttribute('size', size)}
    >
      ${defaultSlot}
    </syn-switch>
  `,
  id: 'syn-switch',
  imports: [
    'import { SynSwitch } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs',
    },
  ],
};
