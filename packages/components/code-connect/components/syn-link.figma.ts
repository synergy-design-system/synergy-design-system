import figma, { html } from '@figma/code-connect/html';

// Color helper
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=24705-3468291&m=dev', {
  example: ({
    quiet,
  }) => html`${quiet}`,
  props: {
    quiet: figma.boolean('quiet', {
      true: 'syn-link--quiet',
    }),
  },
});

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=24700-39151', {
  example: ({
    className,
    defaultSlot,
  }) => html`
    <a
      class=${className}
      href="https://synergy-design-system.github.io/?path=/docs/styles-syn-link--docs"
    >
      ${defaultSlot}
    </a>
  `,
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-link--docs',
    },
  ],
  props: {
    className: figma.className([
      'syn-link',
      figma.boolean('disabled', {
        true: 'syn-link--disabled',
      }),
      figma.enum('size', {
        small: 'syn-link--small',
        medium: 'syn-link--medium',
        large: 'syn-link--large',
      }),      
    ]),
    // @todo: Not possible currently to map nested props in Figma Connect
    // figma.nestedProps('_helper/color/syn-link', {
    //   quiet: figma.boolean('quiet', {
    //     true: 'syn-link--quiet',
    //   }),
    // }),
    defaultSlot: figma.boolean('content', {
      true: figma.string('↳ content'),
    }),
  },
});
