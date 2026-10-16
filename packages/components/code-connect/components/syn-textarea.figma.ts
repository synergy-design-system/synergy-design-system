// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1101-1482
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/textarea/textarea.component.ts
// component=SynTextArea
import figma from 'figma';
import type SynTextArea from '../../src/components/textarea/textarea.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  disabled: instance.getBoolean('disabled'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  label: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
  placeholder: instance.getBoolean('placeholder') ? instance.getString('*value') : undefined,
  readonly: instance.getBoolean('readonly'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  value: instance.getString('*value'),
} satisfies ValidProperties<SynTextArea>;
const {
  disabled, helpText, label, size, value, placeholder, readonly,
} = props;

export default {
  example: figma.code`
    <syn-textarea
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('label', label)}
      ${renderAttribute('size', size)}
      ${renderAttribute('value', value)}
      ${renderAttribute('readonly', readonly)}
      ${renderAttribute('placeholder', placeholder)}
    >
    </syn-textarea>
  `,
  id: 'syn-textarea',
  imports: [
    'import { SynTextarea } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-textarea--docs',
    },
  ],
};
