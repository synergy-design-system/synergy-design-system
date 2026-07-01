// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a clear legend so assistive technologies can announce the group context before users interact with controls inside it.',
    'Use a short description only for supporting information and keep critical instructions in labels, helper text, or validation messages of the contained fields.',
    'Keep grouped fields in a logical reading and tab order so keyboard and screen reader users can complete the section predictably.',
    'Use the disabled state sparingly and only when the entire group is unavailable; explain why the section is disabled whenever possible.',
  ],
  component: 'syn-fieldset',
  related: {
    components: [
      'syn-button',
      'syn-checkbox',
      'syn-combobox',
      'syn-dropdown',
      'syn-file',
      'syn-input',
      'syn-radio',
      'syn-radio-group',
      'syn-range',
      'syn-select',
      'syn-switch',
      'syn-textarea',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use fieldsets to group controls that belong to the same question, task, or domain (for example shipping address, billing details, or communication preferences).',
        'Avoid using a fieldset for single standalone controls with no meaningful group context.',
      ],
      id: 'grouping_and_scope',
      name: 'Grouping and Scope',
    },
    {
      content: [
        'Write concise, descriptive legends that describe the intent of the group and avoid generic titles such as "Details" or "Options".',
        'Use the description for optional context or constraints, not as a replacement for clear field labels and helper text.',
      ],
      id: 'legend_and_description',
      name: 'Legend and Description',
    },
    {
      content: [
        'When disabling a fieldset, ensure users still understand why input is blocked and what action is needed to re-enable it.',
        'Do not use disabled groups to hide required steps in a form flow; prefer progressive disclosure patterns with clear triggers.',
      ],
      id: 'disabled_behavior',
      name: 'Disabled Behavior',
    },
    {
      content: [
        'Use one-column layout for longer inputs and mixed controls to preserve scanability and reduce visual noise.',
        'Use two-column layout only when controls have similar weight and labels remain easy to read on all supported viewport sizes.',
        'Keep in mind that two-column layouts will automatically switch to a single column on smaller viewports, so ensure the reading order remains logical and accessible.',
      ],
      id: 'layout_and_density',
      name: 'Layout and Density',
    },
    {
      content: [
        'When two-column layout contains a direct child `<syn-radio-group>`, enable `group-aware` on `<syn-fieldset>` so grouped options align with fieldset spacing and stay readable across breakpoints.',
        'Avoid mixing `group-aware` radio-group layouts with regular text-like inputs in the same visual grouping; split them into separate fieldsets when the grouped options need a different layout behavior than surrounding controls.',
        'Prefer the dense item spacing when a fieldset only contains checkboxes, radios or radio buttons, as these controls typically benefit from a more compact vertical rhythm.',
      ],
      id: 'group_awareness',
      name: 'Group Awareness',
    },
  ],
  useCases: [
    'Group related personal information fields such as name, email, and phone into a single form section.',
    'Separate billing and shipping sections in checkout flows while keeping each section semantically connected.',
    'Group preference controls such as notification channels or consent options under a shared legend.',
    'Structure longer forms into meaningful sections so users can scan and complete them with less cognitive load.',
  ],
};
