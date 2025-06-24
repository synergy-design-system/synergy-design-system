import figma, { html } from '@figma/code-connect/html';
import type SynCard from '../src/components/card/card.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - image slot should allow to set instance with slot="image"
 * - correct suffix and prefix names
 */

// Image helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15375-72281', {
  example: () => html`
    <img
      slot="image"
      src="https://synergy-design-system.github.io/card-example.jpg"
      alt="Multiple persons having lunch in SICK Academy"
    />
  `,
  imports: [],
  links: [],
});


// Slot option
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15368-59024', {
  example: ({
    defaultSlot,
  }) => html`
    <small>${defaultSlot}</small>
  `,
  imports: [],
  links: [],
  props: {
    defaultSlot: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    })
  },
});

// Footer helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22461&t=IhTCPgq8BxxTKH32-4', {
  example: ({
    defaultSlot,
    label,
  }) => html`
    <div slot="footer">
      ${label}
      <nav>
        ${defaultSlot}
      </nav>
    </div>
  `,
  imports: [],
  links: [],
  props: {
    defaultSlot: figma.children('syn-button'),
    label: figma.children('slot/opt-info'),
  },
});

// Content helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22467&t=IhTCPgq8BxxTKH32-4', {
  example: ({
    content,
    headline,
  }) => html`
    <div>
      <h3>${headline}</h3>
      ${content}
    </div>
  `,
  imports: [],
  links: [],
  props: {
    content: figma.string('content'),
    headline: figma.boolean('headline', {
      true: figma.string('↳ content/headline'),
    }),
  },
});

// Header helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22432&t=IhTCPgq8BxxTKH32-4', {
  example: ({
    headline,
    prefixIcon1,
    prefixIcon2,
    suffixIcon1,
    suffixIcon2,
    suffixIcon3,
    suffixIcon4,
  }) => html`
    <div slot="header">
      ${prefixIcon1}
      ${prefixIcon2}
      ${headline}
      ${suffixIcon1}
      ${suffixIcon2}
      ${suffixIcon3}
      ${suffixIcon4}
    </div>
  `,
  imports: [],
  links: [],
  props: {
    headline: figma.boolean('headline', {
      true: figma.string('↳ content/headline'),
    }),
    // @todo: Naming is reversed in figma! suffix in prefix is rendered as suffix and vice versa
    // It is also spelled completely wrong :(
    prefixIcon1: figma.boolean('↳ suffix/option-1', {
      true: figma.instance('↳ <slot suffix-1>'),
    }),
    prefixIcon2: figma.boolean('↳ suffix/option-2', {
      true: figma.instance('↳ <slot suffix-2>'),
    }),
    suffixIcon1: figma.boolean('↳ preffix/option-1', {
      true: figma.instance('↳ <slot preffix-1>'),
    }),
    suffixIcon2: figma.boolean('↳ preffix/option-2', {
      true: figma.instance('↳ <slot preffix-2>'),
    }),
    suffixIcon3: figma.boolean('↳ preffix/option-3', {
      true: figma.instance('↳ <slot preffix-3>'),
    }),
    suffixIcon4: figma.boolean('↳ preffix/option-4', {
      true: figma.instance('↳ <slot preffix-4>'),
    }),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15409-80280', {
  example: ({
    defaultSlot,
    headerSlot,
    footerSlot,
    imageSlot,
    sharp
  }) => html`
    <syn-card
      sharp=${sharp}
    >
      ${imageSlot}
      ${headerSlot}
      ${defaultSlot}
      ${footerSlot}
    </syn-card>
  `,
  imports: [
    'import { SynCard } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-card--docs',
    },
  ],
  props: {
    defaultSlot: figma.children('_helper/syn-card/base'),
    headerSlot: figma.children('_helper/syn-cards/header'),
    footerSlot: figma.children('_helper/syn-card/footer'),
    imageSlot: figma.boolean('image', {
      true: figma.instance('<image slot>'),
    }),
    sharp: figma.boolean('sharp'),
  } satisfies ValidProperties<SynCard, ['default', 'header', 'footer', 'image']>,
});
