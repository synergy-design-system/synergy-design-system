import type { IntentCapability } from '../types.js';

export const structureCapabilities: IntentCapability[] = [
  {
    categories: ['structure'],
    target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
  },
  {
    categories: ['structure'],
    target: { id: 'component:syn-drawer', kind: 'component', name: 'syn-drawer' },
  },
  {
    categories: ['structure'],
    target: { id: 'component:syn-header', kind: 'component', name: 'syn-header' },
  },
  {
    categories: ['structure'],
    target: { id: 'component:syn-card', kind: 'component', name: 'syn-card' },
  },
  {
    categories: ['structure'],
    target: { id: 'component:syn-divider', kind: 'component', name: 'syn-divider' },
  },
];
