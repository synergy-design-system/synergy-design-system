// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
  ],
  component: 'syn-tab',
  related: {
    components: [
      'syn-tab-group',
      'syn-tab-panel',
    ],
    templates: [
    ],
  },
};
