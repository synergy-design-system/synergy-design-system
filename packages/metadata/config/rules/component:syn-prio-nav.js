// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure navigation items are keyboard reachable and ordered logically.',
    'Use clear labels that reflect destination and not internal naming.',
    'Communicate current location with proper active state semantics.',
  ],
  component: 'syn-prio-nav',
  related: {
    components: [
      'syn-nav-item',
      'syn-menu',
      'syn-menu-item',
      'syn-header',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Place the most important destinations first so they stay visible longer.',
        'Move lower priority items into overflow menus when space is limited.',
        'Review priority order regularly as product usage evolves.',
      ],
      id: 'priority',
      name: 'Priority Handling',
    },
    {
      content: [
        'Keep labels short and distinct to prevent truncation and ambiguity.',
        'Avoid deep nesting in top level priority navigation.',
        'Use predictable ordering patterns such as task or category order.',
      ],
      id: 'labels',
      name: 'Labels and Structure',
    },
    {
      content: [
        'Test behavior at common breakpoints to ensure overflow remains usable.',
        'Ensure menu fallback remains discoverable on narrow viewports.',
        'Keep interaction patterns consistent between desktop and mobile.',
      ],
      id: 'responsive',
      name: 'Responsive Behavior',
    },
  ],
  useCases: [
    'Primary horizontal navigation with overflow handling.',
    'App headers that must adapt to changing viewport widths.',
    'Section navigation where top destinations should stay visible.',
  ],
};
