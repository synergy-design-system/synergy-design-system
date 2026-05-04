// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use only for non-critical information. Hiding content can become a potential barrier, making content more challenging to discover.',
    'For purely decorative images, ALT-tags should be left empty so that screen readers can bypass them and concentrate on conveying meaningful content.',
  ],
  component: 'syn-details',
  related: {
    components: [
      'syn-accordion',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use the "summary" slot to add text to the header.',
        'Use the "default" slot to add content.',
      ],
      id: 'slots',
      name: 'Slots',
    },
    {
      content: [
        'Make sure the header summary clearly describes the content inside.',
        'Keep header summaries concise to prevent them from wrapping onto multiple lines.',
      ],
      id: 'header_summary',
      name: 'Header Summary',
    },
    {
      content: [
        'Ensure the content is focused and necessary. If the information can be splitted into different meaningful units, consider using syn-accordion.',
        'Avoid using collapsible sections for information that must always be visible.',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Use light background options like white, neutral-100 or primary-100.',
      ],
      id: 'background',
      name: 'Background',
    },
  ],
  useCases: [
    'Revealing additional content, such as a detailed description, specifications, or additional options without overwhelming the user with too much content at once.',
    'Interactive elements like a single FAQ item, where the user can expand to see the answer.',
    'Useful in forms to hide optional sections that the user can expand if needed, keeping the form clean and concise.',
  ],
};
