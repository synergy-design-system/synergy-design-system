import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=22460-32928', {
  example: ({
    className,
    defaultSlot,
  }) => html`
    <td
      class=${className}
    >
      ${defaultSlot}
    </td>
  `,
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-table-cell--docs',
    },
  ],
  props: {
    className: figma.className([
      'syn-table-cell',
      figma.boolean('alternating', {
        true: 'syn-table-cell--alternating',
      }),
      figma.boolean('header', {
        true: 'syn-table-cell--header',
      }),
      figma.boolean('shadow-start', {
        true: 'syn-table-cell--shadow-start',
      }),
      figma.boolean('shadow-end', {
        true: 'syn-table-cell--shadow-end',
      }),
      figma.boolean('shadow-top', {
        true: 'syn-table-cell--shadow-top',
      }),
      figma.boolean('shadow-bottom', {
        true: 'syn-table-cell--shadow-bottom',
      }),
      figma.boolean('divider-start', {
        true: 'syn-table-cell--border-start',
      }),
      figma.boolean('divider-end', {
        true: 'syn-table-cell--border-end',
      }),
      figma.boolean('divider-top', {
        true: 'syn-table-cell--border-top',
      }),
      figma.boolean('divider-bottom', {
        true: 'syn-table-cell--border-bottom',
      }),
    ]),
    defaultSlot: figma.instance('<slot>'),
  },
});
