# syn-date-picker

## Summary

A date picker component for selecting dates.

## Common Use Cases

- Enter a delivery, appointment, or booking date as part of a form.
- Choose a reporting period or narrow search results to a date range.
- Select several separate dates for planned visits or activities.

## Usage Guidelines

### Choosing the Component

- Use a date picker when users need to enter a date in a form or filter without keeping a full calendar visible.
- Allow users to enter a known date directly or choose a date from the calendar when surrounding dates and weekdays are helpful.
- Prefer syn-calendar when date selection is the main task and the calendar should remain visible.

### Content and Labels

- Use a label that describes the purpose of the date rather than a generic label such as "Date".
- Display dates in an order familiar to the intended audience, and keep the calendar language consistent with the surrounding interface.
- Provide brief help text when the expected date, selection type, or permitted period may be unclear.
- Keep labels and help text concise, allowing enough room for translated text.

### Selection Behavior

- Make clear whether users should choose one date, a continuous period, or several separate dates.
- For a date range, clearly identify the start and end dates. Do not treat the period as complete until both have been chosen.
- Allow users to correct or clear their entry without restarting the surrounding task.
- Avoid preselecting a date unless it is a meaningful default for the task. Do not imply that users have made a choice they have not confirmed.

### Date Availability

- Make unavailable dates recognizable in the calendar before users attempt to select them.
- Explain restrictions such as booking windows, closed days, or minimum and maximum durations before users encounter an error.
- Apply the same availability rules whether users enter a date directly or choose it from the calendar.

### Validation and Feedback

- Give users time to finish entering the date before presenting an error. A partially entered date is not necessarily a mistake.
- Keep incomplete or invalid entries visible so users can correct them rather than starting again.
- Explain what needs to change with a specific message, such as "Choose a date within the next 30 days", rather than only stating "Invalid date".
- Do not accept an incomplete date or date range as a finished answer when users submit the form.

## Accessibility

- Provide a persistent, descriptive label, such as "Delivery date" or "Reporting period". Do not rely on the empty date fields alone to explain the purpose.
- Ensure that users can enter dates, open and navigate the calendar, and correct their selection using a keyboard, with a clearly visible focus indicator.
- Make selected dates, unavailable dates, and errors distinguishable without relying on color alone.
- Place helpful instructions and error messages near the field, and ensure they can be understood by screen reader users.
- Check date entry on the devices and assistive tools your audience uses. Offer an alternative if the available entry methods do not meet their needs.

## Related Components

- syn-calendar
