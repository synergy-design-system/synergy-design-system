import type { IntentDefinition } from '../../types.js';

export const assistanceIntents: IntentDefinition[] = [
  {
    category: 'assistance',
    description: 'Use tooltip guidance for short, non-critical contextual help.',
    id: 'assistance.tooltip.contextual',
    userGoal: 'Clarify a nearby control or value with concise supplemental text.',
  },
  {
    category: 'assistance',
    description: 'Use contextual icons to visually support meaning near controls or status text.',
    id: 'assistance.icon.contextual',
    userGoal: 'Improve scannability and comprehension with compact visual cues.',
  },
];
