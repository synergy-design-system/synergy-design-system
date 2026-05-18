import type { IntentCapability } from '../types.js';

export const statusCapabilities: IntentCapability[] = [
  {
    categories: ['status'],
    target: { id: 'component:syn-spinner', kind: 'component', name: 'syn-spinner' },
  },
  {
    categories: ['status'],
    target: { id: 'component:syn-progress-bar', kind: 'component', name: 'syn-progress-bar' },
  },
  {
    categories: ['status'],
    target: { id: 'component:syn-progress-ring', kind: 'component', name: 'syn-progress-ring' },
  },
];
