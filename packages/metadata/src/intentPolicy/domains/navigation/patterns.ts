import type { IntentUsagePattern } from '../../types.js';

export const navigationPatterns: IntentUsagePattern[] = [
  {
    description: 'Class-based link navigation pattern for inline or standalone links.',
    intent: 'action.navigation',
    notes: [
      'Use syn-link--quiet when the link should have lower visual emphasis.',
      'Use size variants like syn-link--small, syn-link--medium, or syn-link--large as needed.',
    ],
    priority: 0,
    preset: {
      requiredClasses: ['syn-link'],
    },
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
    target: { id: 'component:syn-tab-group', kind: 'component', name: 'syn-tab-group' },
  },
  {
    description: 'Action-oriented menu with logical grouping and keyboard access.',
    intent: 'navigation.menu.actions',
    target: { id: 'component:syn-menu', kind: 'component', name: 'syn-menu' },
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
];
