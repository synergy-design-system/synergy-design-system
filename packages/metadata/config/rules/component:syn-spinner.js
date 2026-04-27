// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Assign role="status" or use a live region (e.g., aria-live="polite") to inform screen reader users of ongoing loading.',
    'A spinner shouldn\'t itself be focusable or interactive, nor prevent from navigating to other parts of the page while loading continues.',
  ],
  component: 'syn-spinner',
  knownIssues: [
    {
      browser: 'Safari',
      description: 'The \' syn-spinner\' component may experience spinner animation issues in Safari, causing them to appear wobbly.',
    },
  ],
  usageGuidelines: {
    background: [
      'Use light background options like white, neutral-100, primary-100, or use a primary background when inverted.',
    ],
    behavior_and_placement: [
      'Use for processes that take a short amount of time (typically under 4 seconds).',
      'Apply within specific sections rather than blocking the entire page, unless absolutely necessary.',
      'Place in a consistent location relative to the content it is loading.',
    ],
    content: [
      'Include a label or message to provide context about what is being loaded, especially if the loading time is long.',
    ],
    styling: [
      'Maintain consistency in size and style; avoid using spinners of varying sizes on the same page.',
    ],
  },
  useCases: [
    'Indicate that content is being loaded, such as when fetching data from a server or loading a new page.',
    'Show ongoing background processes, like file uploads or data processing tasks.',
    'Used within buttons or interactive elements to indicate that an action is being processed.',
    'Apply to sections of a page that are loading independently, such as widgets or panels.',
    'Display when a form is being submitted to show that the submission is in progress.',
  ],
};
