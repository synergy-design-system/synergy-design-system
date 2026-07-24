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
    description: 'Inline alert for communicating application or validation errors.',
    intent: 'feedback.error.inline',
    preset: {
      props: {
        duration: 0,
        variant: 'error',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Inline alert for critical system states requiring immediate attention.',
    intent: 'feedback.critical.inline',
    preset: {
      props: {
        duration: 0,
        variant: 'critical',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Inline alert for warnings or cautions requiring user attention.',
    intent: 'feedback.warning.inline',
    preset: {
      props: {
        duration: 0,
        variant: 'warning',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Inline alert for positive outcomes or successful operations.',
    intent: 'feedback.success.inline',
    preset: {
      props: {
        duration: 0,
        variant: 'success',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Toast alert for brief error notifications.',
    intent: 'feedback.error.toast',
    preset: {
      props: {
        duration: 4000,
        variant: 'error',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Toast alert for critical system state notifications.',
    intent: 'feedback.critical.toast',
    preset: {
      props: {
        duration: 4000,
        variant: 'critical',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Toast alert for warning notifications.',
    intent: 'feedback.warning.toast',
    preset: {
      props: {
        duration: 4000,
        variant: 'warning',
      },
    },
    target: { id: 'component:syn-alert', kind: 'component', name: 'syn-alert' },
  },
  {
    description: 'Toast alert for success notifications.',
    intent: 'feedback.success.toast',
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
    description: 'Compact badge for positive or completed states.',
    intent: 'feedback.badge.success',
    preset: {
      props: {
        variant: 'success',
      },
    },
    target: { id: 'component:syn-badge', kind: 'component', name: 'syn-badge' },
  },
  {
    description: 'Compact badge for cautionary or attention-needed states.',
    intent: 'feedback.badge.warning',
    preset: {
      props: {
        variant: 'warning',
      },
    },
    target: { id: 'component:syn-badge', kind: 'component', name: 'syn-badge' },
  },
  {
    description: 'Compact badge for urgent or high-severity states.',
    intent: 'feedback.badge.critical',
    preset: {
      props: {
        variant: 'critical',
      },
    },
    target: { id: 'component:syn-badge', kind: 'component', name: 'syn-badge' },
  },
  {
    description: 'Compact badge for failed or problematic states.',
    intent: 'feedback.badge.error',
    preset: {
      props: {
        variant: 'error',
      },
    },
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
