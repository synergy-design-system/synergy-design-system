import figma, { html } from '@figma/code-connect/html';
import type SynTextArea from '../../src/components/textarea/textarea.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1101-1482', {
  example: ({
    disabled,
    helpText,
    label,
    size,
    value,
    placeholder,
    readonly,
  }) => html`
    <syn-textarea
      disabled=${disabled}
      help-text=${helpText}
      label=${label}
      size=${size}
      value=${value}
      readonly=${readonly}
      placeholder=${placeholder}
    >
    </syn-textarea>
  `,
  imports: [
    'import { SynTextarea } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-textarea--docs',
    },
  ],
  props: {
    disabled: figma.boolean('disabled'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    label: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    }),
    placeholder: figma.boolean('placeholder', {
      true: figma.string('*value'),
    }),
    readonly: figma.boolean('readonly'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    value: figma.string('*value'),
  } satisfies ValidProperties<SynTextArea>,
});
