import type { IntentDefinition } from '../types.js';

export const actionIntents: IntentDefinition[] = [
  {
    category: 'action',
    description: 'Use when the component should present the primary action in a context.',
    id: 'action.primary',
    userGoal: 'Highlight the most important next action for the user.',
  },
  {
    category: 'action',
    description: 'Use when the component submits form data.',
    id: 'action.submit',
    userGoal: 'Submit user-provided data to a form handler.',
  },
  {
    category: 'action',
    description: 'Use when the component resets form state to defaults.',
    id: 'action.reset',
    userGoal: 'Clear or reset user-entered data.',
  },
  {
    category: 'action',
    description: 'Use when the component should navigate to another location.',
    id: 'action.navigation',
    userGoal: 'Move the user to another destination.',
  },
  {
    category: 'action',
    description: 'Use icon-only buttons for compact actions where space is constrained.',
    id: 'action.button.icon',
    userGoal: 'Provide a compact action trigger while preserving quick recognition.',
  },
  {
    category: 'action',
    description: 'Use grouped actions when related actions should be presented as one unit.',
    id: 'action.grouped',
    userGoal: 'Present related actions with clear grouping and consistent alignment.',
  },
];
