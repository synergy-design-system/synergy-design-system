import type { IntentCapability } from '../types.js';

export const disclosureCapabilities: IntentCapability[] = [
  {
    categories: ['disclosure'],
    target: { id: 'component:syn-details', kind: 'component', name: 'syn-details' },
  },
  {
    categories: ['disclosure'],
    target: { id: 'component:syn-accordion', kind: 'component', name: 'syn-accordion' },
  },
  {
    categories: ['disclosure'],
    target: { id: 'component:syn-popup', kind: 'component', name: 'syn-popup' },
  },
];
