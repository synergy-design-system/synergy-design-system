// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use only for non-critical information. Hiding content can become a potential barrier, making content more challenging to discover.',
    'Use “close-others” attribute to keep only one item from the group open at a time, reducing the amount of information displayed at once and therefore reducing the cognitive load on the user.',
  ],
  component: 'syn-accordion',
  related: {
    components: [
      'syn-details',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Keep only one section open at a time to prevent information overload, unless multiple open sections are necessary.',
        'Avoid nesting collapsible sections within each other to prevent a confusing user experience.',
      ],
      id: 'Behavior',
      name: 'Behavior',
    },
    {
      content: [
        'Ensure the content is relevant and necessary; avoid including unrelated information.',
        'Avoid using collapsible sections for content that needs to be always visible or is critical for immediate user attention.',
      ],
      id: 'content',
      name: 'Content',
    },
  ],
  useCases: [
    'Organise content into collapsible sections to save space.',
    'Display FAQs where each question can be expanded to reveal its answer.',
    'Structure lengthy content into manageable expandable sections.',
    'Create navigational menus where each section can be expanded to show sub-items, mainly for small viewports.',
  ],
};
