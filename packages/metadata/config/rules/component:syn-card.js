// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure card content has a logical heading and text order so screen readers can parse it correctly.',
    'Do not use cards as the only way to access critical information or actions.',
    'Keep interactive elements inside cards keyboard reachable with clear focus indicators.',
  ],
  component: 'syn-card',
  related: {
    components: [
      'syn-button',
    ],
    templates: [
      'Application-Shell',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Group related information into one card and keep each card focused on a single topic.',
        'Use clear headings and concise body text to improve scanability.',
        'Avoid overloading a card with too many actions or dense information.',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Use spacing and visual hierarchy to separate header, body, and footer regions.',
        'Align card width and density with surrounding content so cards feel consistent.',
        'Use shadows or sharp style consistently across a view.',
      ],
      id: 'layout',
      name: 'Layout and Hierarchy',
    },
    {
      content: [
        'Place primary actions in a predictable location such as the card footer.',
        'Use action labels that clearly describe the result.',
        'Limit actions to the most relevant options for the card context.',
      ],
      id: 'actions',
      name: 'Actions',
    },
  ],
  useCases: [
    'Display grouped information such as KPIs, summaries, or previews.',
    'Provide a reusable container for dashboard modules.',
    'Present actionable items with a compact overview and clear next steps.',
  ],
};
