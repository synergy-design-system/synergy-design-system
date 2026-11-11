// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide a clear heading or instruction explaining what users are choosing, such as "Choose a delivery date".',
    'Make selected dates, today, and unavailable dates distinguishable without relying on color alone.',
    'Ensure that users can navigate and select dates using a keyboard, with a clearly visible focus indicator.',
    'Do not move focus into the calendar unexpectedly or interrupt users while they are navigating dates.',
    'Keep additional date labels short and readable. Avoid placing separate buttons or links inside individual dates.',
  ],
  component: 'syn-calendar',
  related: {
    components: [
      'syn-date-picker',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use a calendar when users benefit from seeing dates in relation to weekdays and surrounding dates.',
        'Prefer syn-date-picker when users need a date field in a form or should be able to type a known date directly.',
        'Do not use the calendar as an agenda or timetable for displaying detailed appointments and events.',
      ],
      id: 'choosing_the_component',
      name: 'Choosing the Component',
    },
    {
      content: [
        'Make clear whether users should choose one date, a continuous period, or several separate dates.',
        'For a date range, clearly distinguish the start, the end, and the days in between.',
        'Wait until both the start and end dates are chosen before treating a date range as complete.',
        'Allow users to correct or clear their selection without restarting the surrounding task.',
      ],
      id: 'selection_behavior',
      name: 'Selection Behavior',
    },
    {
      content: [
        'Explain restrictions that may not be obvious, such as booking windows, closed days, or minimum and maximum durations.',
        'Keep enough surrounding dates visible to help users understand the available choices.',
        'If no suitable dates are available, explain the situation and provide a next step, such as changing the search criteria.',
      ],
      id: 'date_availability',
      name: 'Date Availability',
    },
    {
      content: [
        'Use month and weekday names in the language of the surrounding interface.',
        'Keep date numbers easy to scan. Additional labels or symbols should support the date rather than obscure it.',
        'Explain unfamiliar symbols near the calendar instead of relying on users to interpret them.',
        'Provide enough space for readable labels and comfortable selection, including on smaller screens.',
      ],
      id: 'content_and_labels',
      name: 'Content and Labels',
    },
  ],
  useCases: [
    'Choose a date for a delivery, appointment, or booking.',
    'Select a continuous period for a report or date-based filter.',
    'Choose several separate dates for recurring activities or planned visits.',
  ],
};
