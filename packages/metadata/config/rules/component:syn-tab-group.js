// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide a clear label for the tab group (e.g., via aria-label or aria-labelledby).',
    'The tab group takes a single tabstop, then focus moves to the first interactive element in the tab panel, or the tab panel if there is none. Arrow keys should be used to move between tabs.',
    'Use only for non-critical information. Hiding content can become a potential barrier, making it more challenging for users to access information.',
    'For purely decorative images, ALT-tags should be left empty so that screen readers can bypass them and concentrate on conveying meaningful content.',
  ],
  component: 'syn-tab-group',
  related: {
    templates: [
    ],
  },
  usageGuidelines: {
    background: [
      'Use background options of white, neutral-100, or primary-100.',
    ],
    behavior: [
      'Maintain a consistent tab order across different pages or sections to reduce confusion and enhance user familiarity.',
      'Limit the number of tabs (typically no more than six) to avoid overwhelming users; for more options, consider using side navigation.',
      'Do not nest tabs within other tab containers.',
    ],
    content: [
      'Choose labels that are concise and use no more than two words.',
      'Ensure the first tab is the most relevant for the user.',
      'Place related tabs next to each other for logical grouping.',
      'Avoid overloading each tabs content with too much information; keep it manageable and focused.',
      'Avoid using tabs for content that needs to be read in a specific order; use syn-step-group instead.',
    ],
    styling: [
      'Bold labels if desired, keeping this decision consistent across the group.',
      'Customize to suit user requirements by changing label alignment or deleting the separator between group and content.',
    ],
    tab_panel: [
      'Use syn-tab-panel optionally when applying the "default" tab group variant.',
      'When applying the "container" tab group variant, syn-tab-panel is mandatory.',
    ],
  },
  useCases: [
    'Organize content into different sections, allowing users to switch between them without leaving the page.',
    'Implement in dashboards where users need to access different data views or widgets.',
    'Group settings or configuration options into categories for easier navigation.',
    'Display different aspects of a product, such as description, reviews, and specifications.',
    'Arrange user profile information into sections like personal details, activity, and settings.',
  ],
};
