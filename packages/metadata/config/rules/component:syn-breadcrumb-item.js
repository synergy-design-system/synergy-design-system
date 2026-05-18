// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Dynamically update breadcrumbs and announce changes with aria-live for screen readers.',
    'Provide clear labels for breadcrumb items to ensure screen readers convey the navigation path effectively.',
  ],
  component: 'syn-breadcrumb-item',
  related: {
    components: [
      'syn-breadcrumb',
    ],
    templates: [
      'Breadcrumb',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use clear and descriptive labels that accurately represent each page or section in the navigation path.',
      ],
      id: 'content_and_labeling',
      name: 'Content and Labeling',
    },
  ],
  useCases: [
    'Populate a syn-breadcrumb navigation helping users easily access different pages.',
  ],
};
