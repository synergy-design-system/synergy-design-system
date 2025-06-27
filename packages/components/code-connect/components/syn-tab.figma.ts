import figma, { html } from '@figma/code-connect/html';
import type SynTab from '../src/components/tab/tab.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-47184', {
  example: ({
    closable,
    defaultSlot,
    disabled,
  }) => html`
    <syn-tab
      closable=${closable}
      disabled=${disabled}
    >
      ${defaultSlot}
    </syn-tab>
  `,
  imports: [
    'import { SynTab } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs',
    },
  ],
  props: {
    closable: figma.boolean('close'),
    defaultSlot: figma.boolean('<slot label>', {
      true: figma.string('↳*value'),
    }),
    disabled: figma.boolean('disabled'),
  } satisfies ValidProperties<SynTab>,
});
