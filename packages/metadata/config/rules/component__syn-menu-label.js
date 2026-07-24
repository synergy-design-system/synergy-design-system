// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use menu labels to improve orientation in long menus and grouped options.',
    'Keep label text short so assistive technologies announce groups efficiently.',
    'Do not use menu labels as interactive menu items.',
  ],
  component: 'syn-menu-label',
  related: {
    components: [
      'syn-menu',
      'syn-menu-item',
      'syn-divider',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use menu labels to separate related item groups in large menus.',
        'Use consistent grouping logic such as task type, frequency, or section.',
        'Avoid too many groups that make scanning harder.',
      ],
      id: 'grouping',
      name: 'Grouping',
    },
    {
      content: [
        'Use concise titles such as "File" or "Account".',
        'Use sentence case or title case consistently across the menu.',
        'Avoid verbose labels that duplicate menu item wording.',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Pair menu labels with separators when visual grouping needs reinforcement.',
        'Keep group sizes balanced to avoid very long unbroken sections.',
        'Ensure grouped items remain logically ordered within each section.',
      ],
      id: 'structure',
      name: 'Menu Structure',
    },
  ],
  useCases: [
    'Organize command menus with multiple categories.',
    'Separate account actions from content actions.',
    'Improve scannability in dropdown and context menus.',
  ],
};
