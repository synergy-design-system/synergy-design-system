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
  usageGuidelines: {
    background: [
      'Use light background options like white, neutral-100 or primary-100.',
    ],
    content_and_labeling: [
      'Use clear and descriptive labels that accurately represent each page or section in the navigation path.',
    ],
  },
  useCases: [
    'Populate an < syn-link href="/?path=/docs/components- syn-breadcrumb--docs"> syn-breadcrumb</ syn-link> navigation helping users easily access different pages.',
  ],
};
