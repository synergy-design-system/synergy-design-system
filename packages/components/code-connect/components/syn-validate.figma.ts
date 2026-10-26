// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25638-40480
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/validate/validate.component.ts
// component=SynValidate
import figma from 'figma';
import type SynValidate from '../../src/components/validate/validate.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  customValidationMessage: instance.getString('validation-message'),
  hideIcon: instance.getBoolean('hide-icon'),
  variant: instance.getEnum('variant', {
    inline: 'inline',
    'native (Edge/default)': 'native',
    'native (Safari)': 'native',
    tooltip: 'tooltip',
  }) ?? 'native',
} satisfies ValidProperties<SynValidate>;
const { customValidationMessage, hideIcon, variant } = props;

export default {
  example: figma.code`
    <syn-validate
      ${renderAttribute('custom-validation-message', customValidationMessage)}
      ${renderAttribute('hide-icon', hideIcon)}
      ${renderAttribute('variant', variant)}
    >
      <syn-input required name="something" label="Field to validate" type="text"></syn-input>
    </syn-validate>
  `,
  id: 'syn-validate',
  imports: [
    'import { SynValidate } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-validate--docs',
    },
  ],
};
