// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that button text is unique and contextual. Screen readers will read it aloud, helping users understand the action associated with the button.',
    'Keep button text short. Longer copy is harder to scan and increases cognitive load. Remember that translations may double the length of the text.',
    'Be aware that button\'s height may change based on the user\'s preferred font size set system-wide.',
    'For icon-only: Include an ARIA label describing its function (e.g., "Expand section") to ensure the button is accessible to screen readers.',
    'Prefer keeping the button enabled by default by relying on default values or by validating on submit.',
  ],
  component: 'syn-button',
  related: {
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    action_labels: [
      'Write simple, self-explanatory labels that include both a verb (action) and a noun.',
      'Use text-only labels whenever possible.',
      'Avoid generic labels like "OK" or "Download". Use "Confirm selection" or "Download Report" instead.',
      'Limit action labels to 1 to 3 words or 15 to 20 characters.',
    ],
    action_priority: [
      'Select the appropriate variant for each action based on context and importance.',
      'Avoid displaying more than one Call To Action (CTA) at a time on the screen, especially in the same context (e.g., teaser).',
    ],
    background: [
      'Use light background options like white, neutral-100, primary-100, or use a primary background when inverted.',
    ],
    function: [
      'Use to trigger an action or place a link inside it to navigate to other content.',
    ],
    icons: [
      'Add icons to labels only when they clearly support the associated action (e.g., print, email, share), and reserve icon-only buttons for exceptions.',
      'Avoid displaying both left and right icons simultaneously.',
      'To prevent overcrowding, do not use icons on buttons with extensive copy that spans multiple lines.',
    ],
    placement_and_responsiveness: [
      'Maintain consistent placement of interactive elements throughout the user interface.',
      'Position the primary action at the top (in vertical layout) or on the right (in horizontal layout) when paired with a secondary option.',
      'Avoid placing two primary actions next to each other; opt for a secondary action instead.',
      'Expand to full width on small devices if applicable.',
    ],
  },
  useCases: [
    'Highlight key actions, like "Request information" or "Next step".',
    'Provide supporting actions, like "Learn more", "Explore topic", or "Cancel".',
    'Use for functional actions after user input, such as submitting a form or searching for content.',
  ],
};
