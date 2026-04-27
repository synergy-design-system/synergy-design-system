// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Dynamically update breadcrumbs and announce changes with aria-live for screen readers.',
    'Provide clear labels for breadcrumb items to ensure screen readers convey the navigation path effectively.',
  ],
  component: 'syn-breadcrumb',
  related: {
    components: [
      'syn-breadcrumb-item',
    ],
    templates: [
      'Application Shell',
      'Breadcrumb',
    ],
  },
  usageGuidelines: {
    background: [
      'Use light background options like white, neutral-100 or primary-100.',
    ],
    content_and_labeling: [
      'Use clear and descriptive labels that accurately represent each page or section in the navigation path.',
      'Keep breadcrumb trails short and easy to read to avoid overwhelming users.',
      'The final breadcrumb item should be non-clickable, as it represents the current page or location.',
    ],
    placement_and_consistency: [
      'Ensure breadcrumbs are placed consistently across pages to align with user expectations.',
      'Use breadcrumbs primarily in structured, multi-level navigation contexts. Avoid implementing them for non-hierarchical or dynamically generated paths, where they may confuse rather than assist users.',
    ],
    responsiveness: [
      'On mobile devices breadcrumb is shortened to only provide a link to the higher-level page.',
    ],
  },
  useCases: [
    'Clarify user location within the website or app hierarchy, improving orientation.',
    'Allow easy navigation back to previous pages or higher-level sections.',
    'Enhance discoverability by displaying category paths or product hierarchy levels.',
    'Simplify backtracking from filtered or search result pages to broader content areas.',
  ],
};
