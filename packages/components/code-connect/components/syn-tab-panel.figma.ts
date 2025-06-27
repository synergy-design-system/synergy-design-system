import figma, { html } from '@figma/code-connect/html';
import type SynTabPanel from '../src/components/tab-panel/tab-panel.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20730-44681', {
  example: ({
    defaultSlot,
  }) => html`
    <syn-tab-panel>
      ${defaultSlot}
    </syn-tab-panel>
  `,
  imports: [
    'import { SynTabPanel } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tab-panel--docs',
    },
  ],
  props: {
    defaultSlot: html`
      <div>Replace this slot</div>
    `,
  } satisfies ValidProperties<SynTabPanel>,
});
