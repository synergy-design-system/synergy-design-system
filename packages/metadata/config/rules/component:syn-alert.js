// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Don\'t use alerts for trivial updates that don\'t require user awareness.',
    'Ensure the alert content is concise and clear, focusing on the most critical information.',
    'Use simple language that users can quickly understand without additional context.',
    'Include action items or next steps when appropriate (e.g., "Your session ended. Please login again").',
    'Avoid redundant information — don\'t repeat the title in the body text.',
  ],
  component: 'syn-alert',
  related: {
    components: [
      'syn-validate',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Keep alert messages concise and clear, focusing on the most critical information.',
        'Use simple language that users can quickly understand without additional context.',
        'Include action items or next steps when appropriate (e.g., "Your session ended. Please login again").',
        'Avoid redundant information — don\'t repeat the title in the body text.',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Primary variant: Use for general informational messages that don\'t require urgent attention.',
        'Success variant: Use to confirm that an action was completed successfully.',
        'Warning variant: Use when an action has unexpected consequences or requires user attention.',
        'Danger variant: Use for critical errors, destructive actions, or situations requiring immediate response.',
        'Neutral variant: Use for updates or system messages that are neither positive nor negative.',
      ],
      id: 'variants',
      name: 'Variants & When to Use Them',
    },
    {
      content: [
        'Always include an appropriate icon that reinforces the message tone and helps with quick visual scanning.',
        'Use system icons for consistency (info, check_circle, warning, status-error, settings).',
        'Ensure the icon clearly represents the alert type — don\'t use confusing or misleading icons.',
        'Icons are optional but highly recommended for accessibility and visual clarity.',
      ],
      id: 'icons',
      name: 'Icons',
    },
    {
      content: [
        'Make alerts closable for non-critical information that users might want to dismiss.',
        'For critical errors or required information, consider hiding the close button.',
        'Use auto-hide duration for informational alerts, especially toast notifications (typically 3000-5000ms).',
        'Pause the auto-hide timer when the user hovers over the alert to allow time for reading.',
      ],
      id: 'dismissal',
      name: 'Dismissal & Duration',
    },
    {
      content: [
        'Use small size for brief, non-intrusive messages or in constrained spaces.',
        'Use medium size (default) for most standard alerts and notifications.',
        'Use large size for important messages that need to command attention.',
        'Ensure size choices are consistent with message importance and context.',
      ],
      id: 'sizing',
      name: 'Sizing',
    },
    {
      content: [
        'For inline alerts: Place alerts near the relevant content (above forms, near inputs with errors). You may also use `syn-validate` for inline validation messages where appropriate.',
        'For toast notifications: Use the `toast()` method to display temporary notifications in a stack.',
        'Place success/confirmation alerts above affected content so users see confirmation after action.',
        'Place error alerts prominently and ensure they don\'t disappear automatically.',
      ],
      id: 'placement',
      name: 'Placement & Presentation',
    },
    {
      content: [
        'Never use alerts for decorative purposes or non-essential information.',
        'Avoid stacking more than 3-4 alerts simultaneously to prevent cognitive overload.',
        'Reserve alerts for messages that meaningfully impact the user\'s current task or workflow.',
      ],
      id: 'avoidance',
      name: 'What to Avoid',
    },
  ],
  useCases: [
  ],
};
