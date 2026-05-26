import type { IntentCapability } from '../../types.js';

export const actionCapabilities: IntentCapability[] = [
  {
    categories: ['action'],
    target: {
      id: 'component:syn-button',
      kind: 'component',
      name: 'syn-button',
    },
  },
  {
    categories: ['action'],
    target: {
      id: 'component:syn-icon-button',
      kind: 'component',
      name: 'syn-icon-button',
    },
  },
  {
    categories: ['action'],
    target: {
      id: 'component:syn-button-group',
      kind: 'component',
      name: 'syn-button-group',
    },
  },
];
