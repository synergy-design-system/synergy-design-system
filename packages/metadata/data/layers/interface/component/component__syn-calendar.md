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

### isDateDisabled

attribute: -
reflects: -
type: ``
default: none

(date: Date) => boolean

### max

attribute: `max`
reflects: no
type: `string`
default: `''`

The maximum selectable date as an ISO `YYYY-MM-DD` string.

### maxRange

attribute: `max-range`
reflects: no
type: `number`
default: none

Maximum inclusive calendar-day count for user-created ranges; only positive integers apply.
Preview and completion stop at this boundary when a farther endpoint is requested.
Ignored outside range mode. Assigned values are preserved even when they exceed this limit.

### min

attribute: `min`
reflects: no
type: `string`
default: `''`

The minimum selectable date as an ISO `YYYY-MM-DD` string.

### minRange

attribute: `min-range`
reflects: no
type: `number`
default: none

Minimum inclusive calendar-day count for user-created ranges; only positive integers apply.
Preview and completion expand to this boundary once movement establishes a direction.
Ignored outside range mode. Assigned values are preserved even when shorter than this limit.

### mode

attribute: `mode`
reflects: yes
type: ``
default: `'single'`

'single' | 'range' | 'multiple'

### size

attribute: `size`
reflects: yes
type: ``
default: `'medium'`

'small' | 'medium' | 'large'

### value

attribute: `value`
reflects: no
type: `string[]`
default: `[]`

Selected dates as ISO `YYYY-MM-DD` strings. Single mode accepts one date, range mode two endpoints
(one date is pending), and multiple mode any number of distinct dates.

### valueAsDates

attribute: -
reflects: -
type: `Date[]`
default: none

Sets selected values as UTC date-only `Date` instances.

## Available CSS Parts

- `base`: The component's base wrapper.
- `calendar-item`: A day, month, or year button.
- `calendar-item-active`: An active calendar item.
- `calendar-item-day`: A day button.
- `calendar-item-disabled`: A disabled calendar item.
- `calendar-item-month`: A month button.
- `calendar-item-outside`: A day item belonging to an adjacent month.
- `calendar-item-range-begin`: The beginning of a selected or previewed range.
- `calendar-item-range-clipped`: A date whose requested endpoint is adjusted by a range length limit.
- `calendar-item-range-end`: The end of a selected date range.
- `calendar-item-range-interior`: A date inside the selected or previewed range.
- `calendar-item-range-pending`: The selected start while waiting for a range end.
- `calendar-item-range-preview`: A date in the pending range under the pointer.
- `calendar-item-range-start`: The start of a selected date range.
- `calendar-item-range-unavailable`: A focusable endpoint that violates the pending range's length limits.
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

### syn-before-change

type: `SynBeforeChangeEvent`

Emitted before user change events with the proposed value temporarily set on the host; preventDefault restores the previous value.

### syn-blur

type: `SynBlurEvent`

Emitted when focus leaves the calendar.

### syn-change

type: `SynChangeEvent`

Emitted when a user commits a selection; in range mode this occurs after the end date is chosen.

### syn-clear

type: `SynClearEvent`

Emitted when the user clears a non-empty date value.

### syn-focus

type: `SynFocusEvent`

Emitted when focus enters the calendar.

### syn-input

type: `SynInputEvent`

Emitted when a user changes the selection.

## Dependencies

- `syn-button`
- `syn-icon-button`
