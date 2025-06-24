import figma, { html } from '@figma/code-connect/html';
import type SynDivider from '../src/components/divider/divider.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - Figma divider has no vertical prop
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=4933-9570', {
  example: () => html`
    <syn-divider></syn-divider>
  `,
  imports: [
    'import { SynDivider } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-divider--docs',
    },
  ],
  props: {
  } satisfies ValidProperties<SynDivider>,
});
