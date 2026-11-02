// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1847-5746
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/checkbox/checkbox.component.ts
// component=SynCheckbox
import figma from 'figma';
import type SynCheckbox from '../../src/components/checkbox/checkbox.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  checked: instance.getEnum('selected', {
    default: false,
    selected: true,
  }) ?? false,
  disabled: instance.getBoolean('disabled'),
  helpTextSlot: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  indeterminate: instance.getEnum('selected', {
    indeterminate: true,
  }) ?? false,
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynCheckbox, [
  'default',
  'helpText',
]>;
const {
  checked, disabled, helpTextSlot, readonly, size, indeterminate,
} = props;

export default {
  example: figma.code`
    <syn-checkbox
      ${renderAttribute('checked', checked)}
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('indeterminate', indeterminate)}
      ${renderAttribute('readonly', readonly)}
      ${renderAttribute('size', size)}
    >
      <div slot="help-text">
        ${helpTextSlot}
      </div>
    </syn-checkbox>
  `,
  id: 'syn-checkbox',
  imports: [
    'import { SynCheckbox } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox--docs',
    },
  ],
};
