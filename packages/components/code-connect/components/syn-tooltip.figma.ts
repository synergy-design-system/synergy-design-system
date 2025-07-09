import figma, { html } from '@figma/code-connect/html';
import type SynTooltip from '../../src/components/tooltip/tooltip.js';
import type { ValidProperties } from '../core/types';

/**
 * @todos:
 * - The component does not work properly because it does not allow nesting in figma (e.g. it should support the defaultSlot in Figma).
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16910-25970', {
  example: ({
    content,
  }) => html`
    <syn-tooltip
      content=${content}
    >
      <syn-button>
        Replace this component with the content that should activate the tooltip.
      </syn-button>
    </syn-tooltip>
  `,
  imports: [
    'import { SynTooltip } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tooltip--docs',
    },
  ],
  props: {
    content: figma.string('content'),
  } satisfies ValidProperties<SynTooltip>,
});
