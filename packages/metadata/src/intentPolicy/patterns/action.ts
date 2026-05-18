import type { IntentUsagePattern } from '../types.js';

export const actionPatterns: IntentUsagePattern[] = [
  {
    description: 'Primary action button styling for default primary interaction.',
    intent: 'action.primary',
    preset: {
      props: {
        type: 'button',
        variant: 'filled',
      },
    },
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    description: 'Submit action with semantic submit type and filled emphasis.',
    intent: 'action.submit',
    notes: ['Do not combine submit intent with href-based navigation behavior.'],
    preset: {
      forbiddenProps: ['href'],
      props: {
        type: 'submit',
        variant: 'filled',
      },
    },
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    description: 'Reset action styling for secondary importance.',
    intent: 'action.reset',
    preset: {
      props: {
        type: 'reset',
        variant: 'text',
      },
    },
    target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
  },
  {
    description: 'Navigation action uses href and text variant.',
    intent: 'action.navigation',
    preset: {
      props: {
        href: '#',
        variant: 'text',
      },
    },
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
