import figma, { html } from '@figma/code-connect/html';
import type SynValidate from '../../src/components/validate/validate.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25638-40480', {
  example: ({
    customValidationMessage,
    hideIcon,
    variant,
  }) => html`
    <syn-validate
      custom-validation-message=${customValidationMessage}
      hide-icon=${hideIcon}
      variant=${variant}
    >
      <syn-input required name="something" label="Field to validate" type="text"></syn-input>
    </syn-validate>
  `,
  imports: [
    'import { SynValidate } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-validate--docs',
    },
  ],
  props: {
    customValidationMessage: figma.string('validation-message'),
    hideIcon: figma.boolean('hide-icon'),
    variant: figma.enum('variant', {
      inline: 'inline',
      'native (Edge/default)': 'native',
      'native (Safari)': 'native',
    }),
  } satisfies ValidProperties<SynValidate>,
});
