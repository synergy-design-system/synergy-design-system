import type { IntentCapability } from '../../types.js';

export const navigationCapabilities: IntentCapability[] = [
  {
    categories: ['navigation', 'action'],
    target: {
      classes: ['syn-link'],
      id: 'style:syn-link',
      kind: 'style',
      layer: 'examples',
      selector: '.syn-link',
    },
  },
  {
    categories: ['navigation'],
    target: {
      classes: ['syn-link-list'],
      id: 'style:syn-link-list',
      kind: 'style',
      layer: 'examples',
      selector: '.syn-link-list',
    },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-tab-group', kind: 'component', name: 'syn-tab-group' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-menu', kind: 'component', name: 'syn-menu' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-dropdown', kind: 'component', name: 'syn-dropdown' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-pagination', kind: 'component', name: 'syn-pagination' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-breadcrumb', kind: 'component', name: 'syn-breadcrumb' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-breadcrumb-item', kind: 'component', name: 'syn-breadcrumb-item' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-side-nav', kind: 'component', name: 'syn-side-nav' },
  },
  {
    categories: ['navigation'],
    target: { id: 'component:syn-nav-item', kind: 'component', name: 'syn-nav-item' },
  },
];
