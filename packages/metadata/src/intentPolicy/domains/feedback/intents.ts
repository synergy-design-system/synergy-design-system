import type { IntentDefinition } from '../../types.js';

export const feedbackIntents: IntentDefinition[] = [
  {
    category: 'feedback',
    description: 'Use when contextual feedback should remain near the affected content.',
    id: 'feedback.inline',
    userGoal: 'Explain outcome directly in the current workflow context.',
  },
  {
    category: 'feedback',
    description: 'Use when a short, non-blocking overlay notification is sufficient.',
    id: 'feedback.toast',
    userGoal: 'Acknowledge an event without interrupting the current task.',
  },
  {
    category: 'feedback',
    description: 'Use badges to communicate compact status or count information inline.',
    id: 'feedback.badge.status',
    userGoal: 'Expose concise status signals without interrupting surrounding content.',
  },
  {
    category: 'feedback',
    description: 'Use tag labels to communicate categorization or state in compact form.',
    id: 'feedback.tag.label',
    userGoal: 'Help users identify and scan categories or states quickly.',
  },
  {
    category: 'feedback',
    description: 'Use generic validation feedback to explain invalid or missing input.',
    id: 'feedback.validation.generic',
    userGoal: 'Guide users to correct invalid form input with clear feedback.',
  },
];
