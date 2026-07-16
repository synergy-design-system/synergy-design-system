import type { IntentUsagePattern } from '../../types.js';

export const navigationPatterns: IntentUsagePattern[] = [
  {
    description: 'Class-based link navigation pattern for inline or standalone links.',
    intent: 'action.navigation',
    notes: [
      'Use syn-link--quiet when the link should have lower visual emphasis.',
      'Use size variants like syn-link--small, syn-link--medium, or syn-link--large as needed.',
    ],
    preset: {
      requiredClasses: ['syn-link'],
    },
    priority: 0,
    structure: {
      children: [
        {
          component: 'text',
          text: 'Link',
        },
      ],
      component: 'a',
      props: {
        class: 'syn-link',
        href: '#',
      },
    },
    target: {
      classes: ['syn-link'],
      id: 'style:syn-link',
      kind: 'style',
      layer: 'examples',
      selector: '.syn-link',
    },
    targetRole: 'standalone',
  },
  {
    description: 'Grouped navigation links using the link-list utility class.',
    intent: 'navigation.link-list.grouped',
    preset: {
      requiredClasses: ['syn-link-list'],
    },
    structure: {
      children: [
        {
          children: [
            {
              children: [
                {
                  component: 'syn-icon',
                  props: {
                    name: 'keyboard_arrow_right',
                  },
                },
                {
                  component: 'text',
                  text: 'Link',
                },
              ],
              component: 'a',
              props: {
                class: 'syn-link',
                href: '#',
              },
            },
          ],
          component: 'li',
        },
        {
          children: [
            {
              children: [
                {
                  component: 'syn-icon',
                  props: {
                    name: 'keyboard_arrow_right',
                  },
                },
                {
                  component: 'text',
                  text: 'Link',
                },
              ],
              component: 'a',
              props: {
                class: 'syn-link',
                href: '#',
              },
            },
          ],
          component: 'li',
        },
        {
          children: [
            {
              children: [
                {
                  component: 'syn-icon',
                  props: {
                    name: 'keyboard_arrow_right',
                  },
                },
                {
                  component: 'text',
                  text: 'Link',
                },
              ],
              component: 'a',
              props: {
                class: 'syn-link',
                href: '#',
              },
            },
          ],
          component: 'li',
        },
        {
          children: [
            {
              children: [
                {
                  component: 'syn-icon',
                  props: {
                    name: 'keyboard_arrow_right',
                  },
                },
                {
                  component: 'text',
                  text: 'Link',
                },
              ],
              component: 'a',
              props: {
                class: 'syn-link',
                href: '#',
              },
            },
          ],
          component: 'li',
        },
      ],
      component: 'ul',
      props: {
        class: 'syn-link-list',
      },
    },
    target: {
      classes: ['syn-link-list'],
      id: 'style:syn-link-list',
      kind: 'style',
      layer: 'examples',
      selector: '.syn-link-list',
    },
  },
  {
    description: 'In-page section navigation through related tabs.',
    intent: 'navigation.tabs.section',
    notes: ['Prefer concise tab labels and keep tab count manageable (typically up to six).'],
    priority: 100,
    target: { id: 'component:syn-tab-group', kind: 'component', name: 'syn-tab-group' },
    targetRole: 'container',
  },
  {
    description: 'Single navigable tab item used to activate one related content panel.',
    intent: 'navigation.tabs.section',
    priority: 20,
    target: { id: 'component:syn-tab', kind: 'component', name: 'syn-tab' },
    targetRole: 'item',
  },
  {
    description: 'Content panel associated with one tab in a tab-group navigation flow.',
    intent: 'navigation.tabs.section',
    priority: 10,
    target: { id: 'component:syn-tab-panel', kind: 'component', name: 'syn-tab-panel' },
    targetRole: 'item',
  },
  {
    description: 'Action-oriented menu with logical grouping and keyboard access.',
    intent: 'navigation.menu.actions',
    priority: 100,
    target: { id: 'component:syn-menu', kind: 'component', name: 'syn-menu' },
    targetRole: 'container',
  },
  {
    description: 'Selectable action or destination entry inside a menu.',
    intent: 'navigation.menu.actions',
    priority: 30,
    target: { id: 'component:syn-menu-item', kind: 'component', name: 'syn-menu-item' },
    targetRole: 'item',
  },
  {
    description: 'Non-interactive grouping label used to organize related menu items.',
    intent: 'navigation.menu.actions',
    priority: 10,
    target: { id: 'component:syn-menu-label', kind: 'component', name: 'syn-menu-label' },
    targetRole: 'item',
  },
  {
    description: 'Compact trigger-based reveal of related options or destinations.',
    intent: 'navigation.dropdown.compact-options',
    target: { id: 'component:syn-dropdown', kind: 'component', name: 'syn-dropdown' },
  },
  {
    description: 'Dataset paging controls for large result sets.',
    intent: 'navigation.pagination.dataset',
    target: { id: 'component:syn-pagination', kind: 'component', name: 'syn-pagination' },
  },
  {
    description: 'Hierarchy-aware breadcrumb trail for location and backtracking.',
    intent: 'navigation.breadcrumb.trail',
    priority: 100,
    target: { id: 'component:syn-breadcrumb', kind: 'component', name: 'syn-breadcrumb' },
    targetRole: 'container',
  },
  {
    description: 'Breadcrumb item representing one navigable hierarchy level.',
    intent: 'navigation.breadcrumb.trail',
    priority: 10,
    target: { id: 'component:syn-breadcrumb-item', kind: 'component', name: 'syn-breadcrumb-item' },
    targetRole: 'item',
  },
  {
    description: 'Primary vertical navigation for app shell section switching.',
    intent: 'navigation.sidenav.menu',
    priority: 100,
    target: { id: 'component:syn-side-nav', kind: 'component', name: 'syn-side-nav' },
    targetRole: 'container',
  },
  {
    description: 'Single destination entry within side navigation structures.',
    intent: 'navigation.sidenav.menu',
    priority: 10,
    target: { id: 'component:syn-nav-item', kind: 'component', name: 'syn-nav-item' },
    targetRole: 'item',
  },
  {
    description: 'Priority navigation bar placed in the header navigation slot to keep key destinations visible while overflowing secondary entries.',
    intent: 'navigation.prio.menu',
    notes: [
      'Place syn-prio-nav in the navigation slot of syn-header.',
      'Use this as the main page navigation within header shell layouts.',
    ],
    priority: 100,
    structure: {
      children: [
        {
          component: 'syn-prio-nav',
          slot: 'navigation',
        },
      ],
      component: 'syn-header',
    },
    target: { id: 'component:syn-prio-nav', kind: 'component', name: 'syn-prio-nav' },
    targetRole: 'container',
  },
  {
    description: 'Priority navigation entry within a responsive overflow-capable navigation bar.',
    intent: 'navigation.prio.menu',
    priority: 10,
    target: { id: 'component:syn-nav-item', kind: 'component', name: 'syn-nav-item' },
    targetRole: 'item',
  },
];
