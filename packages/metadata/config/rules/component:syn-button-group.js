// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a label property for accessibility and screen readers.',
    'Label should describe the purpose of the button group (e.g., "Text formatting", "Page navigation").',
    'Use clear, descriptive labels that help users understand the grouped buttons\' relationship.',
    'Labels are not displayed visually but are announced by assistive technologies.',
  ],
  component: 'syn-button-group',
  related: {
    components: [
      'syn-button',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Group related buttons that serve a common purpose or function together.',
        'Use for actions that are logically connected (e.g., text formatting: bold, italic, underline).',
        'Group buttons that control related settings or options within the same UI context.',
        'Avoid grouping buttons that are unrelated or have conflicting purposes.',
      ],
      id: 'grouping',
      name: 'When to Group Buttons',
    },
    {
      content: [
        'Use outline variant (default) for secondary or neutral button groups.',
        'Use filled variant for primary actions or emphasized button groups.',
        'Keep variant consistent within a single button group for visual cohesion.',
        'Choose variant based on the importance and prominence needed in the layout.',
      ],
      id: 'variants',
      name: 'Variants',
    },
    {
      content: [
        'Small: Use for compact spaces, toolbars in tight layouts, or mobile interfaces.',
        'Medium (default): Use for standard UI contexts and most common use cases.',
        'Large: Use for prominent button groups that need extra visibility or accessibility.',
        'Match button group size to the visual hierarchy and context of your page.',
      ],
      id: 'sizing',
      name: 'Sizing',
    },
    {
      content: [
        'Combine with syn-icon for icon-only toolbar-style button groups.',
        'Wrap buttons in syn-tooltip for additional context without cluttering the UI.',
        'Use with syn-dropdown for split-button or menu patterns within groups.',
        'Place all related interactive elements inside the button group slot.',
      ],
      id: 'composition',
      name: 'Composition & Related Elements',
    },
    {
      content: [
        'Use for toolbars with icon buttons and tooltip hints.',
        'Use for segmented controls with radio buttons in a group.',
        'Use for text formatting controls (bold, italic, underline, etc.).',
        'Use for pagination or navigation controls with multiple related actions.',
        'Use for filter or view controls with related options.',
      ],
      id: 'patterns',
      name: 'Common Patterns',
    },
    {
      content: [
        'Maintain visual consistency: all buttons in a group should have similar styling.',
        'Don\'t mix different button variants within a single button group.',
        'Ensure adequate spacing between button groups and other UI elements.',
        'Keep the number of buttons in a group manageable (typically 2-5 buttons).',
      ],
      id: 'consistency',
      name: 'Visual Consistency',
    },
    {
      content: [
        'Each button in the group retains its individual click handlers and states.',
        'Button states (focus, hover, active) are automatically managed by the component.',
        'The component handles size and variant propagation to all child buttons.',
      ],
      id: 'behavior',
      name: 'Component Behavior',
    },
  ],
  useCases: [
  ],
};
