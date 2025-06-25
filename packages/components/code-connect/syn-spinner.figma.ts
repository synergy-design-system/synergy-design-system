import figma, { html } from '@figma/code-connect/html';
import type SynSpinner from '../src/components/spinner/spinner.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=17016-71772', {
  example: () => html`
    <syn-spinner></syn-spinner>
  `,
  imports: [
    'import { SynSpinner } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-spinner--docs',
    },
  ],
  props: {
  } satisfies ValidProperties<SynSpinner>,
});
