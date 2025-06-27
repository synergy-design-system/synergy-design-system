import figma, { html } from '@figma/code-connect/html';
import type SynSwitch from '../../src/components/switch/switch.js';
import type { ValidProperties } from '../core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2190-4038', {
  example: ({
    checked,
    defaultSlot,
    disabled,
    helpText,
    size,
  }) => html`
    <syn-switch
      checked=${checked}
      disabled=${disabled}
      help-text=${helpText}
      size=${size}
    >
      ${defaultSlot}
    </syn-switch>
  `,
  imports: [
    'import { SynSwitch } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs',
    },
  ],
  props: {
    checked: figma.boolean('selected'),
    defaultSlot: figma.boolean('*with label', {
      true: figma.instance('↳ <slot (default)>'),
    }),
    disabled: figma.boolean('disabled'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
  } satisfies ValidProperties<SynSwitch>,
});
