import type { IntentUsagePattern } from '../../../types.js';

export const actionNavigationPattern: IntentUsagePattern = {
  description: 'Navigation action uses href and text variant.',
  intent: 'action.navigation',
  priority: 0,
  structure: {
    component: 'syn-button',
    config: {
      contentRules: [
        {
          code: 'REQUIRED_CONTENT_BUTTON_LABEL',
          kind: 'requiredContent',
          message: 'syn-button must contain visible content (text and/or child nodes).',
          rationale: 'An empty button is inaccessible and provides no affordance to the user.',
          suggestedFix: 'Add a label, text, or child element such as syn-icon inside the button.',
        },
      ],
      propRules: [
        {
          code: 'REQUIRED_PROP_HREF',
          kind: 'requiredEquals',
          message: 'href property must be set for navigation action intent.',
          prop: 'href',
          rationale: 'The href property provides the navigation target for semantic link behavior.',
          suggestedFix: 'Set href property to the target URL or route.',
          value: '#',
        },
        {
          code: 'REQUIRED_PROP_TEXT_VARIANT',
          kind: 'requiredEquals',
          message: 'variant property should be set to "text" for navigation action styling.',
          prop: 'variant',
          rationale: 'Text variant provides unstyled appearance appropriate for link-like navigation.',
          suggestedFix: 'Set variant property to "text".',
          value: 'text',
        },
      ],
    },
  },
  target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  targetRole: 'standalone',
};
