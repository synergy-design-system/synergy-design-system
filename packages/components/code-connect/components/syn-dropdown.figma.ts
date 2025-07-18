import figma, { html } from '@figma/code-connect/html';
import type SynDropdown from '../../src/components/dropdown/dropdown.js';
import type { ValidProperties } from '../core/types';

/**
 * @todos
 * - Figma divider has no vertical prop
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=11573-375949', {
  example: ({
    defaultSlot,
  }) => html`
    <syn-dropdown>
      ${defaultSlot}
    </syn-dropdown>
  `,
  imports: [
    'import { SynDropdown } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-dropdown--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('*'),
  } satisfies ValidProperties<SynDropdown>,
});
