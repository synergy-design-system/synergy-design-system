// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Consider alternatives to switches, as many users may find them confusing.',
    'If the switch triggers dynamic changes (e.g., loading new content), provide a corresponding announcement.',
  ],
  component: 'syn-switch',
  related: {
    components: [
      'syn-checkbox',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use for actions that take effect immediately without requiring additional confirmation.',
        'Ensure the visual state accurately reflects its functional state.',
        'If it\'s unclear whether the component is showing a state or an action, use syn-checkbox instead.',
      ],
      id: 'behavior',
      name: 'Behavior',
    },
    {
      content: [
        'Make sure both the label and action are clear by using appropriate text.',
        'Place label text on top of the control, such as in a header, while action text should be placed to the right, next to the control.',
        'Use adjectives to describe actions, as they are less ambiguous than verbs.',
        'Limit use to binary choices, such as "on/off" or "yes/no".',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Use readonly to display an existing on/off setting that users may inspect but cannot toggle here.',
        'Use disabled only when changing the setting is unavailable; explain the condition that prevents toggling it.',
      ],
      id: 'states',
      name: 'Validation and States',
    },
  ],
  useCases: [
    'Allow users to switch between two states.',
    'Use to enable or disable settings, such as turning notifications on or off.',
    'Toggle features or functionalities within an application, applying changes immediately.',
  ],
};
