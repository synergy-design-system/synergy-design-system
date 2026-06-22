import type { IntentUsagePattern } from '../../../types.js';

export const actionSubmitPattern: IntentUsagePattern = {
  description: 'Submit action with semantic submit type and filled emphasis.',
  intent: 'action.submit',
  notes: ['Do not combine submit intent with href-based navigation behavior.'],
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
          code: 'REQUIRED_PROP_SUBMIT_TYPE',
          kind: 'requiredEquals',
          message: 'type property must be set to "submit" for submit action intent.',
          prop: 'type',
          rationale: 'The semantic submit type ensures proper form submission behavior.',
          suggestedFix: 'Set type property to "submit".',
          value: 'submit',
        },
        {
          code: 'REQUIRED_PROP_FILLED_VARIANT',
          kind: 'requiredEquals',
          message: 'variant property should be set to "filled" for action emphasis.',
          prop: 'variant',
          rationale: 'Filled variant provides clear visual priority for actions.',
          suggestedFix: 'Set variant property to "filled".',
          value: 'filled',
        },
        {
          code: 'FORBIDDEN_PROP_HREF',
          kind: 'forbidden',
          message: 'href property is not compatible with submit action intent.',
          prop: 'href',
          rationale: 'Submit intent uses form submission semantics, not navigation. Use action.navigation for link-based navigation.',
          suggestedFix: 'Remove href property and use a form or event handler for submission.',
        },
        {
          code: 'INTENT_TEMPORARILY_BLOCKED',
          kind: 'warnWhenEquals',
          message: 'Submit intent is currently blocked because the control is disabled.',
          prop: 'disabled',
          rationale: 'This can be intentional in gated flows where the control is enabled after form input becomes valid.',
          severity: 'warning',
          suggestedFix: 'Enable the control once the form becomes valid so users can complete submission.',
          value: true,
        },
      ],
    },
  },
  target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
};
