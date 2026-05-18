import type { IntentUsagePattern } from '../types.js';

export const disclosurePatterns: IntentUsagePattern[] = [
  {
    description: 'On-demand disclosure for one optional information block.',
    intent: 'disclosure.details.on-demand',
    target: { id: 'component:syn-details', kind: 'component', name: 'syn-details' },
  },
  {
    description: 'Grouped progressive disclosure for multiple related sections.',
    intent: 'disclosure.accordion.grouped',
    preset: {
      props: {
        'close-others': true,
      },
    },
    target: { id: 'component:syn-accordion', kind: 'component', name: 'syn-accordion' },
  },
  {
    description: 'On-demand popup disclosure anchored to a trigger element.',
    intent: 'disclosure.popup.on-demand',
    notes: ['Keep popup content concise and directly related to the trigger context.'],
    target: { id: 'component:syn-popup', kind: 'component', name: 'syn-popup' },
  },
];
