// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'A visible label may be omitted for search input fields within a combobox if an associated button-complete with a clear search icon and an appropriate accessible name (e.g., aria-label="Search")-is provided.',
    'Be aware that group labels will be neglected by most assistive devices.',
  ],
  component: 'syn-combobox',
  related: {
    components: [
      'syn-option',
      'syn-optgroup',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use light backgrounds such as white, neutral-100, or primary-100 for clarity and consistency across different layouts.',
        'Keep focus styles clearly visible when the user navigates through suggestions with a keyboard or screen reader.',
      ],
      id: 'background',
      name: 'Background',
    },
    {
      content: [
        'Keep option labels concise so that suggestions are easy to scan and select.',
        'Provide a clear, descriptive placeholder (e.g., "Search or select an option...") to help users understand they can type and choose from suggestions.',
        'Avoid repeating the same initial word in multiple suggestions to reduce scanning difficulty.',
      ],
      id: 'content_and_labels',
      name: 'Content and Labels',
    },
    {
      content: [
        'Filter available options in real time as the user types; highlight or bold matching text to indicate relevance.',
        'Show a message (e.g., "No matches found") when no options align with the user\'s input.',
        'Consider limiting the maximum number of displayed suggestions to avoid overwhelming users. We recommend displaying 6-8 (with scrolling for additional results).',
      ],
      id: 'searching_behavior',
      name: 'Searching Behavior',
    },
  ],
  useCases: [
    'Allow users to select one or more options from a potentially large list by typing a search string and filtering suggestions.',
    'Provide an autocomplete feature in forms where specific or complex entries benefit from quick lookup.',
    'Implement in search fields or filter panels when users may not recall the exact option name but can approximate it.',
    'Long or descriptive labels, helper text, or units are needed.',
    'Forms with many fields that users must scan quickly.',
    'Compact layouts and simple fields.',
  ],
};
