import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=29590-40206', {
  example: ({
    className,
    defaultSlot,
  }) => html`
    <nav
      class=${className}
    >
      ${defaultSlot}
    </nav>
  `,
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-link-list--docs',
    },
  ],
  props: {
    className: figma.className([
      'syn-link-list',
      figma.enum('size', {
        large: 'syn-link-list--large',
        medium: 'syn-link-list--medium',
        small: 'syn-link-list--small',
      }),
      figma.boolean('horizontal', {
        true: 'syn-link-list--horizontal',
      }),
    ]),
    defaultSlot: figma.children('*'),
  },
});
