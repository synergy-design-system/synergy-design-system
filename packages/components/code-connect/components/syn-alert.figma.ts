import figma, { html } from '@figma/code-connect/html';
import type SynAlert from '../../src/components/alert/alert.js';
import type { ValidProperties } from '../core/types';

/**
 * @todos
 * - variant prop should be sharable with the color helper
 * - icon slot should allow to set instance with slot="icon"
 */

// Variant helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16231-21245&t=uiGCtkXQsyEo930h-4', {
  example: ({
    variant,
  }) => html`${variant}`,
  imports: [],
  links: [],
  props: {
    variant: figma.enum('variant', {
      danger: 'danger',
      neutral: 'neutral',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
    }),
  },
});

// Content Slot
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16231-21242&t=uiGCtkXQsyEo930h-4', {
  example: ({
    headline,
    text,
  }) => html`
    <div>
      <h3>${headline}</h3>
      <p>${text}</p>
    </div>
  `,
  imports: [],
  links: [],
  props: {
    headline: figma.string('↳ content/headline'),
    text: figma.string('text'),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25728-47292', {
  example: ({
    closable,
    defaultSlot,
    iconSlot,
    variant,
  }) => html`
    <syn-alert
      closable=${closable}
      variant=${variant.variant}
    >
      ${defaultSlot}
      ${iconSlot}
    </syn-alert>
  `,
  imports: [
    'import { SynAlert } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs',
    },
  ],
  props: {
    closable: figma.boolean('closable'),
    defaultSlot: figma.children('_helper/syn-alert/content'),
    iconSlot: figma.boolean('icon', {
      false: html`<span slot="icon"></span>`,
      true: html`<syn-icon slot="icon" name="info"></syn-icon>`,
      // @todo: Replace with actual icon instance when available via code connect api
      // true: figma.instance('↳ <icon slot>'),
    }),
    variant: figma.nestedProps('_helper/color/syn-alert', {
      variant: figma.enum('variant', {
        danger: 'danger',
        neutral: 'neutral',
        primary: 'primary',
        success: 'success',
        warning: 'warning',
      }),
    }),
  } satisfies ValidProperties<SynAlert, ['default', 'icon']>,
});
