// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide clear navigation labels and preserve logical focus order.',
    'Ensure current location is communicated for active items and sections.',
    'Keep rail and collapsed states keyboard operable and understandable.',
  ],
  component: 'syn-side-nav',
  related: {
    components: [
      'syn-nav-item',
      'syn-header',
    ],
    templates: [
      'AppShell',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use side navigation for secondary or section level navigation.',
        'Organize items into clear groups with consistent naming patterns.',
        'Avoid deeply nested structures that are hard to scan and maintain.',
      ],
      id: 'structure',
      name: 'Navigation Structure',
    },
    {
      content: [
        'Use sticky mode when navigation should remain visible during page scroll.',
        'Use fixed mode only when it does not block core page content.',
        'Use rail mode for compact icon first navigation with strong icon semantics.',
      ],
      id: 'layout',
      name: 'Layout Variants',
    },
    {
      content: [
        'Use indentation consistently to reflect hierarchy.',
        'Provide footer actions only for secondary utilities and account controls.',
        'Ensure collapse and expand behavior is predictable across breakpoints.',
      ],
      id: 'behavior',
      name: 'Interaction',
    },
  ],
  useCases: [
    'Secondary navigation beneath a primary header.',
    'Section navigation in management and admin applications.',
    'Persistent workspace navigation for desktop oriented layouts.',
  ],
};
