import figma, { html } from '@figma/code-connect/html';
import type SynCheckbox from '../src/components/checkbox/checkbox.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - prefix and suffix slots should allow to set instances with slot="prefix" and slot="suffix"
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1847-5746', {
  example: ({
    checked,
    disabled,
    helpTextSlot,
    size,
    indeterminate,
  }) => html`
    <syn-checkbox
      checked=${checked}
      disabled=${disabled}
      indeterminate=${indeterminate}
      size=${size}
    >
      <div slot="help-text">
        ${helpTextSlot}
      </div>
    </syn-checkbox>
  `,
  imports: [
    'import { SynCheckbox } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox--docs',
    },
  ],
  props: {
    checked: figma.enum('selected', {
      default: false,
      selected: true,
    }),
    disabled: figma.boolean('disabled'),
    helpTextSlot: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    indeterminate: figma.enum('selected', {
      indeterminate: true,
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
  } satisfies ValidProperties<SynCheckbox, ['default', 'helpText']>,
});
