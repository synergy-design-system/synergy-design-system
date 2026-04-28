// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Verify that dividers are visible and distinct in high contrast mode settings, which are often used by users with visual impairments.',
    'Use to provide clear separation between sections, helping users understand content flow. Screen readers announce dividers, offering context about transitions between sections.',
  ],
  component: 'syn-divider',
  usageGuidelines: {
    background: [
      'Use light background options like white, neutral-100 or primary-100.',
    ],
    spacing_and_consistency: [
      'Maintain consistent spacing around separators to prevent them from appearing cramped or too distant from the content they divide.',
      'Ensure consistent use to prevent confusion, especially for users relying on assistive technologies.',
    ],
    whitespace_vs_visual_separators: [
      'Leverage whitespace effectively as a natural divider, which can offer a clean, easy to read and organised design without additional visual elements.',
    ],
  },
  useCases: [
    'Separate distinct item groups to help users clearly see and understand how different pieces of content relate to one another.',
    'Provide visual breaks in long pages or forms to improve readability.',
  ],
};
