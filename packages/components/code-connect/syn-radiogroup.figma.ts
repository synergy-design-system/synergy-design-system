import figma, { html } from '@figma/code-connect/html';
import type SynRadioGroup from '../src/components/radio-group/radio-group.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1345-17304', {
  example: ({
    defaultSlot,
    helpText,
    label,
  }) => html`
    <syn-radio-group
      help-text=${helpText}
      label=${label.label}
    >
      ${defaultSlot}
    </syn-radio-group>
  `,
  imports: [
    'import { SynRadioGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio-group--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('syn-radio'),
    helpText: figma.boolean('help-text', {
      true: figma.string('↳ content/help-text'),
    }),
    label: figma.nestedProps('slot/label', {
      label: figma.boolean('label', {
        true: figma.string('↳ content/label'),
      })
    })
  } satisfies ValidProperties<SynRadioGroup>,
});
