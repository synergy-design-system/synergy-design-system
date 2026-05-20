import type { IntentCapability } from '../../types.js';

export const inputCapabilities: IntentCapability[] = [
  {
    categories: ['input'],
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-textarea', kind: 'component', name: 'syn-textarea' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-combobox', kind: 'component', name: 'syn-combobox' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-checkbox', kind: 'component', name: 'syn-checkbox' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-switch', kind: 'component', name: 'syn-switch' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-radio-group', kind: 'component', name: 'syn-radio-group' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-file', kind: 'component', name: 'syn-file' },
  },
  {
    categories: ['input'],
    target: { id: 'component:syn-range', kind: 'component', name: 'syn-range' },
  },
];
