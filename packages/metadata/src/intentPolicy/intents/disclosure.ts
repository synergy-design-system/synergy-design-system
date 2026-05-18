import type { IntentDefinition } from '../types.js';

export const disclosureIntents: IntentDefinition[] = [
  {
    category: 'disclosure',
    description: 'Use details to progressively reveal one block of optional content.',
    id: 'disclosure.details.on-demand',
    userGoal: 'Show extra information only when requested by the user.',
  },
  {
    category: 'disclosure',
    description: 'Use accordions to reveal grouped sections and reduce information overload.',
    id: 'disclosure.accordion.grouped',
    userGoal: 'Organize larger content into scannable, expandable sections.',
  },
  {
    category: 'disclosure',
    description: 'Use popups to reveal related secondary content on demand near a trigger.',
    id: 'disclosure.popup.on-demand',
    userGoal: 'Show contextual secondary content without navigating away.',
  },
];
