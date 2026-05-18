import type { IntentUsagePattern } from '../types.js';

export const assistancePatterns: IntentUsagePattern[] = [
  {
    description: 'Short non-critical contextual help tied to a nearby trigger.',
    intent: 'assistance.tooltip.contextual',
    target: { id: 'component:syn-tooltip', kind: 'component', name: 'syn-tooltip' },
  },
  {
    description: 'Contextual icon used as a compact visual hint near related content.',
    intent: 'assistance.icon.contextual',
    notes: ['Use alongside text or tooltips when meaning is not universally obvious.'],
    target: { id: 'component:syn-icon', kind: 'component', name: 'syn-icon' },
  },
];
