# syn-calendar

## Summary

Calendars allow users to select dates from a calendar interface.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-calendar--docs)

## Class Information

- **Tag Name:** `syn-calendar`
- **Import Example:** `import SynCalendar from '@synergy-design-system/components/components/calendar/calendar.js';`

## Usage Information

- **Status:** experimental
- **Since:** 0.0.0

## Available Properties

### disabledDates

attribute: `disabled-dates`
reflects: no
type: `string[]`
default: `[]`

An array of dates that should be disabled in the calendar.
Dates should be provided as ISO `YYYY-MM-DD` strings.

### disabledWeekdays

attribute: `disabled-weekdays`
reflects: no
type: `Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>`
default: `[]`

Use disabled-weekdays to disable specific weekdays.
The attribute accepts a space-separated list of three-letter weekday names (sun, mon, tue, wed, thu, fri, sat), in any order.

### value

attribute: `value`
reflects: no
type: `string`
default: `''`

The selected date as an ISO `YYYY-MM-DD` string, or an empty string when unset.

### valueAsDate

attribute: -
reflects: -
type: `undefined`
default: none

Sets the selected value as a UTC date-only `Date`.

## Attribute-only Members

These attributes are reflected but not exposed as component properties.

### max

reflects: no
type: `string`
default: `''`

-

### min

reflects: no
type: `string`
default: `''`

-

## Available CSS Parts

- `base`: The component's base wrapper.
- `calendar-item`: A day, month, or year button.
- `calendar-item-active`: An active calendar item.
- `calendar-item-day`: A day button.
- `calendar-item-disabled`: A disabled calendar item.
- `calendar-item-month`: A month button.
- `calendar-item-outside`: A day item belonging to an adjacent month.
- `calendar-item-today`: The item representing today.
- `calendar-item-year`: A year button.
- `clear-button`: The button for clearing the selected value.
- `content`: The calendar view content.
- `current-period-button`: The button for navigating to the current day, month, or year.
- `day-grid`: The day-of-month table.
- `footer`: The calendar footer actions.
- `header`: The calendar header.
- `month-grid`: The month selection grid.
- `month-navigation`: The month navigation controls.
- `navigation-label`: The current month, year, or year range in the navigation header.
- `next-button`: The next-period navigation button.
- `previous-button`: The previous-period navigation button.
- `year-grid`: The year selection grid.
- `year-navigation`: The year navigation controls.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when focus leaves the calendar.

### syn-change

type: `SynChangeEvent`

Emitted when a user commits a different date value.

### syn-clear

type: `SynClearEvent`

Emitted when the user clears a non-empty date value.

### syn-focus

type: `SynFocusEvent`

Emitted when focus enters the calendar.

### syn-input

type: `SynInputEvent`

Emitted when a user changes the date value.

## Dependencies

- `syn-button`
- `syn-icon-button`
