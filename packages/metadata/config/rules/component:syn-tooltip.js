// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Avoid placing buttons, links, or other interactive controls inside a tooltip, as it\'s designed to be an ephemeral container for supplementary information.',
    'On desktop, tooltips open by default on hover over the trigger element, or optionally on click. They close by clicking the trigger again or by moving the pointer away.',
    'On touch devices, tooltips open when tapping on the trigger element and close by tapping on the trigger element again.',
    'For keyboard navigation, tooltips should open by focusing (Tab) on the trigger element and close by pressing Escape or by moving focus away.',
  ],
  component: 'syn-tooltip',
  related: {
    templates: [
    ],
  },
  usageGuidelines: {
    background: [
      'Use with light background options of white, neutral-100 and primary-100.',
    ],
    behavior_and_placement: [
      'Place the tooltip where the floating element does not obscure important content related to the subject.',
      'Ensure it disappears when the user interacts with other elements.',
      'Avoid tooltips being cropped by other elements of the interface; use appropriate placement for this purpose.',
    ],
    content: [
      'Use short, descriptive text; if a longer explanation is required, consider non-interactive means to convey this information.',
      'Avoid jargon or highly technical language; aim to solve questions, not trigger more.',
      'Do not use for critical or unique information.',
      'Do not place links, buttons, or other interactive elements within the content.',
    ],
    styling: [
      'Display a headline by bolding the text if it makes the content easier to understand.',
      'Emphasize key information by bolding parts of the text.',
    ],
    trigger_element: [
      'Use any interactive element as a tooltip trigger by placing it in the provided slot; the default trigger (info-i) can be replaced based on context or preference.',
    ],
  },
  useCases: [
    'Provide additional, useful, and non-essential information about form fields.',
    'Expand abbreviations or acronyms that might be unfamiliar to users.',
    'Offer detailed information about specific data points in charts or graphs.',
    'Provide more context for error messages or warnings and anticipate any questions that users may have.',
  ],
};
