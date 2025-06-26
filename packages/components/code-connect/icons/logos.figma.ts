import figma, { html } from '@figma/code-connect/html';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=41-4000', {
  example: ({
    content,
  }) => html`${content}`,
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
    content: figma.enum('name', {
      'logo-claim-color': html`<img src="node_modules/@synergy-design-system/assets/src/logos/logo-claim-color.svg" alt="SICK" />`,
      'logo-claim-black': html`<img src="node_modules/@synergy-design-system/assets/src/logos/logo-claim-black.svg" alt="SICK" />`,
      'logo-claim-white': html`<img src="node_modules/@synergy-design-system/assets/src/logos/logo-claim-white.svg" alt="SICK" />`,
      'logo-color': html`<syn-icon name="logo-color" library="system"></syn-icon>`,
      'logo-black': html`<img src="node_modules/@synergy-design-system/assets/src/logos/logo-black.svg" alt="SICK" />`,
      'logo-white': html`<img src="node_modules/@synergy-design-system/assets/src/logos/logo-white.svg" alt="SICK" />`,
    }),
  },
});
