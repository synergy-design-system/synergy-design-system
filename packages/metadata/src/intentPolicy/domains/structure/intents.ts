import type { IntentDefinition } from '../../types.js';

export const structureIntents: IntentDefinition[] = [
  {
    category: 'structure',
    description: 'Use when confirming a risky or destructive operation in a dialog.',
    id: 'structure.confirmation',
    userGoal: 'Require clear user confirmation before executing a destructive action.',
  },
  {
    category: 'structure',
    description: 'Use drawers to reveal supplemental panels from an edge overlay.',
    id: 'structure.drawer.overlay',
    userGoal: 'Present secondary workflows without leaving the current context.',
  },
  {
    category: 'structure',
    description: 'Use headers to establish a consistent top-level page shell structure.',
    id: 'structure.header.shell',
    userGoal: 'Provide a consistent frame for branding, navigation, and meta actions.',
  },
  {
    category: 'structure',
    description: 'Use card containers to group related content into a bounded section.',
    id: 'structure.content.container',
    userGoal: 'Improve scannability by grouping related information and actions.',
  },
  {
    category: 'structure',
    description: 'Use dividers to separate adjacent sections and improve visual hierarchy.',
    id: 'structure.content.separator',
    userGoal: 'Clarify boundaries between groups of content.',
  },
];
