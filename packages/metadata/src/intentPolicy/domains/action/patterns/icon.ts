import type { IntentUsagePattern } from '../../../types.js';

export const actionIconPattern: IntentUsagePattern = {
  description: 'Compact icon-only action button with accessible label requirements.',
  intent: 'action.button.icon',
  notes: ['Provide an accessible label (for example aria-label) because no visible text is shown.'],
  structure: {
    component: 'syn-icon-button',
  },
  target: { id: 'component:syn-icon-button', kind: 'component', name: 'syn-icon-button' },
};
