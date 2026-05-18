import type { IntentDefinition } from '../types.js';

export const statusIntents: IntentDefinition[] = [
  {
    category: 'status',
    description: 'Use loading indicators inside a specific region while content is fetched.',
    id: 'status.loading.section',
    userGoal: 'Communicate in-progress loading without blocking the full interface.',
  },
  {
    category: 'status',
    description: 'Use loading indicators inside actions while a command is processing.',
    id: 'status.loading.action',
    userGoal: 'Signal ongoing processing for a submitted user action.',
  },
  {
    category: 'status',
    description: 'Use linear progress bars to communicate determinate progress in workflows.',
    id: 'status.progress.linear',
    userGoal: 'Show measurable progress toward completion over time.',
  },
  {
    category: 'status',
    description: 'Use circular progress rings for compact determinate progress indicators.',
    id: 'status.progress.circular',
    userGoal: 'Show measurable progress in compact UI regions.',
  },
];
