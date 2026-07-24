// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a meaningful label attribute for icon only buttons.',
    'Ensure focus styles remain visible in all variants and states.',
    'Avoid using icon buttons for destructive actions without clear context or confirmation.',
  ],
  component: 'syn-icon-button',
  related: {
    components: [
      'syn-icon',
      'syn-button',
      'syn-tooltip',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use concise labels that describe the resulting action, such as "Edit" or "Close".',
        'Add a tooltip when extra context is helpful, especially in dense toolbars.',
        'Keep label wording consistent across the product.',
      ],
      id: 'labeling',
      name: 'Labeling',
    },
    {
      content: [
        'Use icon buttons for quick actions and compact controls.',
        'Prefer regular buttons when text improves clarity.',
        'Use disabled state sparingly and explain why an action is unavailable when possible.',
      ],
      id: 'interaction',
      name: 'Interaction',
    },
    {
      content: [
        'Use size variants consistently within a control group.',
      ],
      id: 'size',
      name: 'Size',
    },
  ],
  useCases: [
    'Toolbar actions such as edit, delete, and settings.',
    'Compact controls in tables, cards, and dialogs.',
    'Navigation utility actions in headers and side panels.',
  ],
};
