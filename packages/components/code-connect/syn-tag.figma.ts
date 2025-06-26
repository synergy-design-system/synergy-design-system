import figma, { html } from '@figma/code-connect/html';
import type SynTag from '../src/components/tag/tag.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2842-16750', {
  example: ({
    defaultSlot,
    iconSlot,
    removable,
    size,
  }) => html`
    <syn-tag
      removable=${removable}
      size=${size}
    >
      ${iconSlot}
      ${defaultSlot}
    </syn-tag>
  `,
  imports: [
    'import { SynTag } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tag--docs',
    },
  ],
  props: {
    iconSlot: figma.boolean('*icon', {
      true: figma.instance('↳ icon'),
    }),
    defaultSlot: figma.instance('<slot (default)>'),
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
    removable: figma.boolean('removable'),
  } satisfies ValidProperties<SynTag, ['default', 'icon']>,
});
