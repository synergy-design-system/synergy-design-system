// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Avoid using badges for purely decorative purposes',
    'Ensure badge is sized and placed so it does not obscure other content or controls',
    'If the badge conveys critical information, provide it in text elsewhere too',
    'Use aria-live when badge content updates dynamically',
  ],
  component: 'syn-badge',
  knownIssues: [
    {
      browser: 'Safari',
      description: 'Badge with role=\'status\' inside syn-button does not announce updates',
    },
    {
      browser: 'Firefox',
      description: 'Only announces content of the element that has updates when multiple elements are inside the badge',
    },
  ],
  related: {
    components: [
      'syn-status-badge',
    ],
    templates: [
      'Badge',
      'Tab Group with Badge',
      'Tab Group with Icon and Badge',
      'Status Badge',
    ],
  },
  usageGuidelines: {
    background: [
      'Use light backgrounds: white, neutral-100, primary-100',
      'Use primary background when inverted',
    ],
    color: [
      'Consistently apply one color choice for a cohesive look',
      'Use default variants for standard notifications',
      'Blue = neutral integration, green = more attention, red = maximum emphasis',
      'Do not associate color variants with success or error states',
    ],
    content: [
      'Use only numbers as content',
      'Use "+" for overflow values set by the application',
    ],
    placement: [
      'Place where it preserves relation to the assigned element',
      'Do not obscure any informative element or text',
      'Do not alter the number formatting',
    ],
  },
  useCases: [
    'Indicate the number of items selected, such as when using a filter',
    'Show the count of newly added items',
    'Display the number of messages received or tasks still pending',
    'Present the quantity of items collected, like those in a shopping cart',
  ],
};
