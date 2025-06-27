import figma, { html } from '@figma/code-connect/html';
import type SynSideNav from '../src/components/side-nav/side-nav.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=12362-15033&m=dev', {
  example: ({
    defaultSlot,
    open,
    variant,
  }) => html`
    <syn-side-nav
      open=${open}
      variant=${variant}
    >
      ${defaultSlot}
    </syn-side-nav>
  `,
  imports: [
    'import { SynSideNav } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-side-nav--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('helper/syn-side-nav/menu'),
    open: figma.boolean('open'),
    variant: figma.enum('variant', {
      default: 'default',
      rail: 'rail',
      sticky: 'sticky',
    })
  } satisfies ValidProperties<SynSideNav>,
});
