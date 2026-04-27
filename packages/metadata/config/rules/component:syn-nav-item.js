// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide a logical tab order that follows the visual sequence of navigation items and their different levels.',
    'Use aria-current="page" or aria-current="location" on the active navigation item to communicate the user\'s current location.',
  ],
  component: 'syn-nav-item',
  related: {
    components: [
      'syn-header',
      'syn-side-nav',
    ],
    templates: [
      'Application Shell',
    ],
  },
  usageGuidelines: {
    background_options: [
      'Use with background options of white, neutral-100, and primary-100.',
    ],
    labels_and_icons: [
      'Use clear, concise labels for navigation items.',
      'Don\'t use icons alone unless they are universally understood.',
      'Use icons and labels together to enhance comprehension.',
    ],
    spacing: [
      'Use relaxed for extra spacing on vertical desktop viewports.',
      'Use indented for nested navigation items in vertical desktop or mobile viewports and in horizontal mobile menus.',
    ],
    text_styles_and_descriptions: [
      'The default style is "book", but text can be bolded if desired.',
      'Bold text for current / parent as well as first level navigation.',
      'Override with "text.black" for non-clickable second level items.',
      'Be consistent in the use of descriptions: Include them for all items at the same level and keep them similar in length.',
    ],
  },
  useCases: [
    'Populate an syn-header navigation bar at the top of a page, helping users easily access different sections.',
    'Implement navigation items in a sidebar for a more detailed and hierarchical navigation structure.',
  ],
};
