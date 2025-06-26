import figma, { html } from '@figma/code-connect/html';
import type SynMenu from '../src/components/menu/menu.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=11516-365094', {
  example: ({
    defaultSlot,
  }) => html`
    <syn-menu>
      ${defaultSlot}
    </syn-menu>
  `,
  imports: [
    'import { SynMenu } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-menu--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('syn-menu-item'),
  } satisfies ValidProperties<SynMenu>,
});
