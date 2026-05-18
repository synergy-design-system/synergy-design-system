import type { IntentCapability } from '../types.js';

export const feedbackCapabilities: IntentCapability[] = [
  {
    categories: ['feedback'],
    target: {
      id: 'component:syn-alert',
      kind: 'component',
      name: 'syn-alert',
    },
  },
  {
    categories: ['feedback'],
    target: {
      id: 'component:syn-badge',
      kind: 'component',
      name: 'syn-badge',
    },
  },
  {
    categories: ['feedback'],
    target: {
      id: 'component:syn-tag',
      kind: 'component',
      name: 'syn-tag',
    },
  },
  {
    categories: ['feedback'],
    target: {
      id: 'component:syn-tag-group',
      kind: 'component',
      name: 'syn-tag-group',
    },
  },
  {
    categories: ['feedback'],
    target: {
      id: 'component:syn-validate',
      kind: 'component',
      name: 'syn-validate',
    },
  },
];
