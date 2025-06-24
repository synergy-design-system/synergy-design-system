import figma, { html } from '@figma/code-connect/html';
import type SynBreadcrumb from '../src/components/breadcrumb/breadcrumb.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - default slot should be visible whenever one of the details is open, not just the first one
 * - currently no possibility to toggle only the current level
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=18458-27241', {
  example: ({
    defaultSlot,
  }) => html`
    <syn-breadcrumb
    >
      ${defaultSlot}
    </syn-breadcrumb>
  `,
  imports: [
    'import { SynBreadcrumb } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb--docs',
    },
  ],
  props: {
    defaultSlot: figma.boolean('level-1', {
      true: figma.children('syn-breadcrumb-item'),
    }),
  } satisfies ValidProperties<SynBreadcrumb>,
});
