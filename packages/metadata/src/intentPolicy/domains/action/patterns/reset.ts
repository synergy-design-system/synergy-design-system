import type { IntentUsagePattern } from '../../../types.js';

export const actionResetPattern: IntentUsagePattern = {
  description: 'Reset action styling for secondary importance.',
  intent: 'action.reset',
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
          code: 'REQUIRED_PROP_RESET_TYPE',
          kind: 'requiredEquals',
          message: 'type property must be set to "reset" for reset action intent.',
          prop: 'type',
          rationale: 'The semantic reset type ensures proper form reset behavior.',
          suggestedFix: 'Set type property to "reset".',
          value: 'reset',
        },
        {
          code: 'REQUIRED_PROP_TEXT_VARIANT',
          kind: 'requiredEquals',
          message: 'variant property should be set to "text" for secondary action styling.',
          prop: 'variant',
          rationale: 'Text variant provides lower visual priority appropriate for reset actions.',
          suggestedFix: 'Set variant property to "text".',
          value: 'text',
        },
      ],
    },
  },
  target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
};
