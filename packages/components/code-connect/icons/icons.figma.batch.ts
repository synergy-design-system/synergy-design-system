import figma from 'figma';

export default {
  example: figma.code`<syn-icon name="${figma.batch.name}"></syn-icon>`,
  id: 'syn-icon',
  imports: [
    "import '@synergy-design-system/components/components/icon/icon.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs',
    },
  ],
  metadata: {
    nestable: true,
  },
};
