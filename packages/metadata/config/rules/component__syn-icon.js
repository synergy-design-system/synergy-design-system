// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide a label when the icon conveys meaning or triggers an action.',
    'Use decorative icons without labels so assistive tech can ignore them.',
    'Do not rely on icon color alone to communicate state.',
  ],
  component: 'syn-icon',
  related: {
    components: [
      'syn-icon-button',
      'syn-button',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use icons to support text, not replace it, unless the icon is universally understood.',
        'For icon only interactions, pair with syn-icon-button and an accessible label.',
        'Choose icons that match the user intent and context.',
      ],
      id: 'semantics',
      name: 'Semantics',
    },
    {
      content: [
        'Use consistent icon sizes within the same interface area.',
        'Use design tokens for color and avoid ad hoc hex colors.',
        'Keep visual weight balanced when combining icons with text.',
      ],
      id: 'styling',
      name: 'Styling',
    },
    {
      content: [
        'Use bundled libraries for common icons whenever possible.',
        'Use custom libraries only when required by brand or domain specific assets.',
        'Validate fallback behavior when loading icons from CDN or sprite sheets.',
      ],
      id: 'sources',
      name: 'Icon Sources',
    },
  ],
  useCases: [
    'Add visual cues to buttons, alerts, and status messages.',
    'Represent actions in compact toolbars.',
    'Support navigation and quick scanning in dense layouts.',
  ],
};
