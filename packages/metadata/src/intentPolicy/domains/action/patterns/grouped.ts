import type { IntentUsagePattern } from '../../../types.js';

export const actionGroupedPattern: IntentUsagePattern = {
  description: 'Group related actions into one aligned unit for consistent interaction.',
  intent: 'action.grouped',
  notes: ['Prefer grouping actions with related intent and similar importance.'],
  structure: {
    component: 'syn-button-group',
  },
  target: { id: 'component:syn-button-group', kind: 'component', name: 'syn-button-group' },
};
