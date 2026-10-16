# syn-date-picker

## Summary

A date picker component for selecting dates.

## Common Use Cases

- Select a single date, a continuous range, or several individual dates in a form.
- Combine desktop segmented entry with calendar navigation and date availability constraints.
- Display locale-specific date structures while submitting stable ISO dates.

## Usage Guidelines

### Behavior

- Use mode="single", "range", or "multiple". Value is one whitespace-separated ISO string, and form submission uses the same format.
- Unfinished or impossible drafts retain the committed value and block validated submission. Four digits are required for typed years.
- Real typed dates violating min/max, disabled rules, or range-length rules remain visible and committed but invalid. Calendar selection rejects unavailable dates.
- Clear is cancelable through syn-before-change and clears drafts as well as selection. syn-input can describe a draft while value is unchanged; syn-change describes committed value changes.
- Readonly fields remain focusable and submitted but do not open the calendar. Disabled fields are not submitted. Reset restores defaultValue without user value events.
- Interrupted show()/hide() calls resolve; callers must inspect current open state before applying asynchronous focus effects.
- The inherited shared-controller whole-form validation scan may omit externally associated controls. This limitation is tracked separately.

### Content

- Use lang="de-DE", "en-GB", or another valid regional locale to control date-part order and separators. Use lang rather than a locale attribute.
- Public values and valueAsDates remain ISO/UTC date-only regardless of display locale. Malformed locale tags fall back to English.
- Paste ISO dates/lists separated by whitespace, commas, or semicolons, or one locale-ordered numeric date with a four-digit year. Unrecognized input is not guessed.
- Customize date labels with day-YYYY-MM-DD, month-0 through month-11, and year-YYYY slots. Calendar styling parts are forwarded with the calendar__ prefix.

## Accessibility

- Provide a label attribute or label slot. Each segment is a keyboard-focusable spinbutton named by the field, date group, and date part.
- Use Left/Right to move between segments and Up/Down to change values. Alt+Down opens the calendar; Escape closes it before canceling unfinished drafts.
- Manual segmented entry is currently desktop keyboard-driven. Native mobile keyboards, text selection, dictation, and complete IME input are not guaranteed.
- Use reportValidity() to expose validation errors and focus the affected segment. checkValidity() checks without revealing error styling.

## Related Components

- syn-calendar
