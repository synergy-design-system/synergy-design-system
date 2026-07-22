import type { IntentUsagePattern } from '../../types.js';

export const feedbackPatterns: IntentUsagePattern[] = [
  {
    description: 'Inline alert for contextual feedback near related content.',
    intent: 'feedback.inline',
    preset: {
      props: {
        duration: 0,
        variant: 'warning',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Toast alert for brief, non-blocking status acknowledgement.',
    intent: 'feedback.toast',
    preset: {
      props: {
        duration: 4000,
        variant: 'success',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Compact status or count feedback using badge visuals.',
    intent: 'feedback.badge.status',
    target: { id: 'component:syn-badge', kind: 'component', name: 'syn-badge' },
  },
  {
    description: 'Compact categorical or state labeling using tags.',
    intent: 'feedback.tag.label',
    priority: 0,
    target: { id: 'component:syn-tag', kind: 'component', name: 'syn-tag' },
    targetRole: 'standalone',
  },
  {
    description: 'Grouped tags for concise display of multiple labels or states.',
    intent: 'feedback.tag.label',
    priority: -10,
    target: { id: 'component:syn-tag-group', kind: 'component', name: 'syn-tag-group' },
    targetRole: 'container',
  },
  {
    description: 'Generic validation feedback for incorrect or missing user input.',
    intent: 'feedback.validation.generic',
    target: { id: 'component:syn-validate', kind: 'component', name: 'syn-validate' },
  },
];
