// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use menu items inside syn-menu so keyboard navigation and selection events remain consistent.',
    'Ensure each item has a clear text label; icons in prefix or suffix slots must not be the only way to convey meaning.',
    'For type="checkbox" items, ensure checked states communicate meaningful toggles and can be understood without visual cues alone.',
    'Use disabled state only when necessary and provide context when an action is unavailable.',
  ],
  component: 'syn-menu-item',
  related: {
    components: [
      'syn-menu',
    ],
    templates: [
      'AppShell',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use menu items for action lists or option lists that are secondary to the main page flow.',
        'Order items by user priority and group related actions together, separated by dividers when needed.',
        'Keep labels short and action-oriented (for example, "Rename", "Export", "Delete").',
      ],
      id: 'structure_and_order',
      name: 'Structure and Order',
    },
    {
      content: [
        'Use normal items for immediate actions and checkbox items for persistent on/off preferences.',
        'Avoid mixing destructive actions among neutral actions without clear visual separation.',
        'Use loading state only for actions with pending async work and keep feedback short-lived.',
      ],
      id: 'item_types_and_states',
      name: 'Item Types and States',
    },
    {
      content: [
        'Use prefix icons to improve scanability, but ensure labels are still self-explanatory without icons.',
        'Use suffix content for supplementary context such as status or additional hints.',
        'Avoid overly dense menus with long labels, deep nesting, or too many checkable items in one list.',
      ],
      id: 'content_and_density',
      name: 'Content and Density',
    },
  ],
  useCases: [
    'Offer contextual actions in dropdown and overflow menus.',
    'Expose compact command lists in app headers and toolbars.',
    'Provide preference toggles with checkbox-style menu items.',
    'Present grouped navigation shortcuts in compact surfaces.',
  ],
};
