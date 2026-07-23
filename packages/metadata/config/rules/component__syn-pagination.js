// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide clear labels for pagination controls and page size selectors.',
    'Ensure keyboard users can reach and operate next, previous, and direct page input.',
    'Announce page changes and invalid page input clearly.',
  ],
  component: 'syn-pagination',
  related: {
    components: [
      'syn-select',
      'syn-input',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use pagination for large datasets where loading all records at once is not practical.',
        'Keep page size options meaningful for the context, such as 10, 25, and 50.',
        'Show current page and total pages so users understand position.',
      ],
      id: 'navigation',
      name: 'Navigation',
    },
    {
      content: [
        'Use compact mode when horizontal space is limited.',
        'Use size variants consistently with nearby form controls.',
        'Avoid changing pagination density between sibling views without reason.',
      ],
      id: 'density',
      name: 'Compact and Size Variants',
    },
    {
      content: [
        'Preserve current page when filters and sorting stay compatible with the dataset.',
        'Reset to page one when filter changes invalidate the current page.',
        'Disable controls only when navigation is not possible, such as first or last page boundaries.',
      ],
      id: 'behavior',
      name: 'Behavior',
    },
  ],
  useCases: [
    'Navigate through table records across pages.',
    'Paginate long result lists in search and catalog pages.',
    'Control page size in data heavy admin views.',
  ],
};
