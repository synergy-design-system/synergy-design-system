import type { IntentUsagePattern } from '../types.js';

export const structurePatterns: IntentUsagePattern[] = [
  {
    description: 'Confirmation dialog with explicit cancel and destructive actions in footer slot.',
    intent: 'structure.confirmation',
    notes: [
      'Renderers should preserve footer action ordering (cancel before destructive confirm).',
      'Destructive action should be visually distinct from the cancel action.',
    ],
    roles: {
      cancelAction: 'abort',
      confirmAction: 'confirm-destructive',
      container: 'dialog',
      footer: 'group',
    },
    structure: {
      children: [
        {
          component: 'text',
          role: 'content',
          text: 'Content',
        },
        {
          children: [
            {
              component: 'syn-button',
              config: {
                propRules: [
                  {
                    code: 'REQUIRED_CANCEL_VARIANT_TEXT',
                    kind: 'requiredEquals',
                    message: 'Cancel action should use text variant in confirmation dialog footer.',
                    prop: 'variant',
                    rationale: 'Text variant keeps cancel action visually secondary to destructive confirmation.',
                    suggestedFix: 'Set variant property to "text".',
                    value: 'text',
                  },
                ],
              },
              role: 'cancelAction',
              text: 'Abort',
            },
            {
              component: 'syn-button',
              config: {
                propRules: [
                  {
                    code: 'REQUIRED_CONFIRM_VARIANT_FILLED',
                    kind: 'requiredEquals',
                    message: 'Confirm action should use filled variant in confirmation dialog footer.',
                    prop: 'variant',
                    rationale: 'Filled variant visually signals the destructive nature of the action.',
                    suggestedFix: 'Set variant property to "filled".',
                    value: 'filled',
                  },
                  {
                    code: 'FORBIDDEN_CONFIRM_HREF',
                    kind: 'forbidden',
                    message: 'Confirm action in confirmation dialogs must not use href navigation.',
                    prop: 'href',
                    rationale: 'Destructive confirmation should execute an explicit action, not navigate away.',
                    suggestedFix: 'Remove href and handle confirmation through action callbacks.',
                  },
                ],
              },
              role: 'confirmAction',
              text: 'Delete this!',
            },
          ],
          component: 'nav',
          role: 'footer',
          slot: 'footer',
        },
      ],
      component: 'syn-dialog',
      props: {
        open: true,
      },
      role: 'container',
    },
    target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
  },
  {
    description: 'Edge-aligned drawer overlay for secondary contextual workflows.',
    intent: 'structure.drawer.overlay',
    notes: ['Use drawers for supplementary content that should not replace the current page context.'],
    target: { id: 'component:syn-drawer', kind: 'component', name: 'syn-drawer' },
  },
  {
    description: 'Top-level header shell structure for branding and navigation regions.',
    intent: 'structure.header.shell',
    notes: [
      'Navigation slot can host primary navigation controls such as syn-prio-nav.',
      'Meta-navigation slot can host compact utility actions such as syn-icon-button.',
    ],
    target: { id: 'component:syn-header', kind: 'component', name: 'syn-header' },
  },
  {
    description: 'Card container grouping related content and supporting actions.',
    intent: 'structure.content.container',
    target: { id: 'component:syn-card', kind: 'component', name: 'syn-card' },
  },
  {
    description: 'Visual separator between adjacent blocks of related content.',
    intent: 'structure.content.separator',
    target: { id: 'component:syn-divider', kind: 'component', name: 'syn-divider' },
  },
];
