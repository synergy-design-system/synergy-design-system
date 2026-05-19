import type { IntentUsagePattern } from '../types.js';

export const actionPatterns: IntentUsagePattern[] = [
  {
    config: {
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
    description: 'Primary action button styling for default primary interaction.',
    intent: 'action.primary',
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    config: {
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
    description: 'Submit action with semantic submit type and filled emphasis.',
    intent: 'action.submit',
    notes: ['Do not combine submit intent with href-based navigation behavior.'],
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    config: {
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
    description: 'Reset action styling for secondary importance.',
    intent: 'action.reset',
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    config: {
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
    description: 'Navigation action uses href and text variant.',
    intent: 'action.navigation',
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    description: 'Compact icon-only action button with accessible label requirements.',
    intent: 'action.button.icon',
    notes: ['Provide an accessible label (for example aria-label) because no visible text is shown.'],
    target: { id: 'component:syn-icon-button', kind: 'component', name: 'syn-icon-button' },
  },
  {
    description: 'Group related actions into one aligned unit for consistent interaction.',
    intent: 'action.grouped',
    notes: ['Prefer grouping actions with related intent and similar importance.'],
    target: { id: 'component:syn-button-group', kind: 'component', name: 'syn-button-group' },
  },
];
