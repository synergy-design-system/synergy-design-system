import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=1616-1651', {
  example: ({
    name,
  }) => html`
    <syn-icon name=${name}></syn-icon>
  `,
  imports: [
    'import { SynIcon } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs',
    },
  ],
  props: {
    name: 'wallpaper',
  },
});
