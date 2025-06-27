import figma, { html } from '@figma/code-connect/html';
import type SynFile from '../../src/components/file/file.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=21709-47500', {
  example: ({
    disabled,
    droparea,
    helpText,
    hideValue,
    label,
    size,
  }) => html`
    <syn-file
      disabled=${disabled}
      droparea=${droparea}
      help-text=${helpText}
      hide-value=${hideValue}
      label=${label}
      size=${size}
    >
    </syn-file>
  `,
  imports: [
    'import { SynFile } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-file--docs',
    },
  ],
  props: {
    disabled: figma.boolean('disabled'),
    droparea: figma.boolean('droparea'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    hideValue: figma.boolean('*hide-value', {
      false: true,
      true: false,
    }),
    label: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
  } satisfies ValidProperties<SynFile>,
});
