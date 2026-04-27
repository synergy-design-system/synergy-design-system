// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that when the menu is triggered via keyboard, the first item receives focus.',
  ],
  component: 'syn-dropdown',
  related: {
    templates: [
      'Application Shell',
    ],
  },
  usageGuidelines: {
    behavior: [
      'Avoid hiding sets of less than 4 items in dropdowns.',
      'Refrain from nesting dropdowns within each other. If nesting is strictly necessary, limit the menu to two layers to prevent complex operation and cognitive load.',
      'Keep the panel near its trigger so users understand its context.',
    ],
    panel_items: [
      'Group related panel items to make them easier to find, especially if there are many. Use a group label and syn-divider to separate them visually.',
    ],
    triggers: [
      'Maintain consistent styling for dropdown triggers placed at the same level or in the same group; i.e., if a trigger has both text and icon, other triggers on the same level or group should also display text and icon.',
      'Avoid truncating trigger labels if possible.',
    ],
  },
  useCases: [
    'Provide a list of items in a compact space.',
    'Display additional options or settings related to a specific item.',
    'Enable navigation through different sections or categories.',
  ],
};
