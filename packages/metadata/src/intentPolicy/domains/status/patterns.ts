import type { IntentUsagePattern } from '../../types.js';

export const statusPatterns: IntentUsagePattern[] = [
  {
    description: 'Section-local loading indicator while content is fetched.',
    intent: 'status.loading.section',
    preset: {
      props: {
        size: 'medium',
      },
    },
    target: { id: 'component:syn-spinner', kind: 'component', name: 'syn-spinner' },
  },
  {
    description: 'Inline processing indicator inside an action flow.',
    intent: 'status.loading.action',
    preset: {
      props: {
        size: 'small',
      },
    },
    target: { id: 'component:syn-spinner', kind: 'component', name: 'syn-spinner' },
  },
  {
    description: 'Determinate linear progress indicator for measurable workflow completion.',
    intent: 'status.progress.linear',
    target: { id: 'component:syn-progress-bar', kind: 'component', name: 'syn-progress-bar' },
  },
  {
    description: 'Determinate circular progress indicator for compact progress displays.',
    intent: 'status.progress.circular',
    target: { id: 'component:syn-progress-ring', kind: 'component', name: 'syn-progress-ring' },
  },
];
