import figma, { html } from '@figma/code-connect/html';
import type SynIconButton from '../../src/components/icon-button/icon-button.js';
import type { ValidProperties } from '../core/types';

/**
 * @todos
 * - Name is static because it is a slot in figma, but a text prop in the component.
 * - Problem with this is that is is seen as an instance locally, so we cannot use it as a string
 */

// Color helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=2856-3618', {
  example: ({
    color,
  }) => html`${color}`,
  props: {
    color: figma.enum('color', {
      disabled: 'currentColor',
      neutral: 'currentColor',
      primary: 'primary',
    }),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=3173-8459', {
  example: ({
    color,
    disabled,
    size,
    name,
  }) => html`
    <syn-icon-button
      color=${color.color}
      disabled=${disabled}
      name=${name}
      size=${size}
    >
    </syn-icon-button>
  `,
  imports: [
    'import { SynIconButton } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-icon-button--docs',
    },
  ],
  props: {
    color: figma.nestedProps('color', {
      color: figma.enum('color', {
        disabled: 'currentColor',
        neutral: 'currentColor',
        primary: 'primary',
      }),
    }),
    disabled: figma.boolean('disabled'),
    name: 'wallpaper',
    size: figma.enum('size', {
      large: 'large',
      medium: 'medium',
      small: 'small',
    }),
  } satisfies ValidProperties<SynIconButton>,
});
