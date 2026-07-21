import type { IntentDefinition } from '../../types.js';

export const navigationIntents: IntentDefinition[] = [
  {
    category: 'navigation',
    description: 'Use link-list styles to present grouped navigation links with consistent spacing.',
    id: 'navigation.link-list.grouped',
    userGoal: 'Scan and navigate related links quickly in a vertical list.',
  },
  {
    category: 'navigation',
    description: 'Use tabs to switch between related content sections in-place.',
    id: 'navigation.tabs.section',
    userGoal: 'Move between grouped views without leaving the current page.',
  },
  {
    category: 'navigation',
    description: 'Use menus to provide grouped actions or destinations.',
    id: 'navigation.menu.actions',
    userGoal: 'Access frequently used commands through a structured action list.',
  },
  {
    category: 'navigation',
    description: 'Use pagination controls for large datasets split across pages.',
    id: 'navigation.pagination.dataset',
    userGoal: 'Navigate through bounded result sets efficiently.',
  },
  {
    category: 'navigation',
    description: 'Use dropdowns to reveal compact, related options from a trigger.',
    id: 'navigation.dropdown.compact-options',
    userGoal: 'Access secondary options while preserving layout space.',
  },
  {
    category: 'navigation',
    description: 'Use breadcrumb trails to show hierarchy and support quick backtracking.',
    id: 'navigation.breadcrumb.trail',
    userGoal: 'Understand current location and navigate to ancestor levels quickly.',
  },
  {
    category: 'navigation',
    description: 'Use side navigation to expose primary navigation sections in vertical layouts.',
    id: 'navigation.sidenav.menu',
    userGoal: 'Move between major sections in an app shell efficiently.',
  },
  {
    category: 'navigation',
    description: 'Use priority navigation bars to expose primary destinations and automatically overflow secondary items.',
    id: 'navigation.prio.menu',
    userGoal: 'Reach high-priority destinations quickly while keeping overflow destinations accessible.',
  },
];
