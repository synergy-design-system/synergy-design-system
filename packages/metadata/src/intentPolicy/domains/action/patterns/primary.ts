import type { IntentUsagePattern } from '../../../types.js';

export const actionPrimaryPattern: IntentUsagePattern = {
  description: 'Primary action button styling for default primary interaction.',
  intent: 'action.primary',
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
          code: 'REQUIRED_PROP_BUTTON_TYPE',
          kind: 'requiredEquals',
          message: 'type property must be set to "button" for primary action intent.',
          prop: 'type',
          rationale: 'The semantic button type ensures proper HTML behavior and accessibility.',
          suggestedFix: 'Set type property to "button".',
          value: 'button',
        },
        {
          code: 'REQUIRED_PROP_FILLED_VARIANT',
          kind: 'requiredEquals',
          message: 'variant property should be set to "filled" for primary action emphasis.',
          prop: 'variant',
          rationale: 'Filled variant provides clear visual priority for primary actions.',
          suggestedFix: 'Set variant property to "filled".',
          value: 'filled',
        },
      ],
    },
  },
  target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
};
