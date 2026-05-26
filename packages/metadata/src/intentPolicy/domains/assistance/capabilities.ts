import type { IntentCapability } from '../../types.js';

export const assistanceCapabilities: IntentCapability[] = [
  {
    categories: ['assistance'],
    target: { id: 'component:syn-tooltip', kind: 'component', name: 'syn-tooltip' },
  },
  {
    categories: ['assistance'],
    target: { id: 'component:syn-icon', kind: 'component', name: 'syn-icon' },
  },
];
