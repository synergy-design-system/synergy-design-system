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

## Available Slots

- `day-YYYY-MM-DD`: Dynamic slots replacing a day's label, e.g. day-2026-12-24. The fallback is the two-digit day number.
- `month-0`: Replaces January's label; the fallback is its localized short month name.
- `month-1`: Replaces February's label; the fallback is its localized short month name.
- `month-2`: Replaces March's label; the fallback is its localized short month name.
- `month-3`: Replaces April's label; the fallback is its localized short month name.
- `month-4`: Replaces May's label; the fallback is its localized short month name.
- `month-5`: Replaces June's label; the fallback is its localized short month name.
- `month-6`: Replaces July's label; the fallback is its localized short month name.
- `month-7`: Replaces August's label; the fallback is its localized short month name.
- `month-8`: Replaces September's label; the fallback is its localized short month name.
- `month-9`: Replaces October's label; the fallback is its localized short month name.
- `month-10`: Replaces November's label; the fallback is its localized short month name.
- `month-11`: Replaces December's label; the fallback is its localized short month name.
- `year-YYYY`: Dynamic slots replacing a year's label, e.g. year-2026. The fallback is the year number.

## Available Properties

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables every interaction surface and suppresses calendar events without clearing the value.

### disabledDates

attribute: `disabled-dates`
reflects: no
type: `string[]`
default: `[]`

An array of dates that should be disabled in the calendar.
Dates should be provided as ISO `YYYY-MM-DD` strings.
The attribute accepts whitespace-separated dates, ignoring invalid tokens and duplicates.

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
The boundary is inclusive; an empty or invalid value leaves it unset.
Assigned selections are preserved. A maximum before the minimum allows no selectable dates.

### maxRange

attribute: `max-range`
reflects: no
type: `number`
default: none

Maximum inclusive calendar-day count for user-created ranges; only positive integers apply.
Preview and completion stop at this boundary when a farther endpoint is requested.
Ignored outside range mode. Assigned values are preserved even when they exceed this limit.
Unset or invalid limits impose no restriction; a positive maximum below the minimum prevents completion.

### min

attribute: `min`
reflects: no
type: `string`
default: `''`

The minimum selectable date as an ISO `YYYY-MM-DD` string.
The boundary is inclusive; an empty or invalid value leaves it unset.
Assigned selections are preserved. A minimum after the maximum allows no selectable dates.

### minRange

attribute: `min-range`
reflects: no
type: `number`
default: none

Minimum inclusive calendar-day count for user-created ranges; only positive integers apply.
Preview and completion expand to this boundary once movement establishes a direction.
Ignored outside range mode. Assigned values are preserved even when shorter than this limit.
Unset or invalid limits impose no restriction; a positive minimum above the maximum prevents completion.

### mode

attribute: `mode`
reflects: yes
type: ``
default: `'single'`

'single' | 'range' | 'multiple'

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Prevents selection, Clear, and selection previews while allowing navigation; suppresses calendar events.

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
The attribute accepts whitespace-separated dates; any invalid token empties the attribute-derived value.
Values are sorted chronologically; multiple selections are unique. Assigned unselectable values are preserved.
Programmatic assignments emit no user value events.

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
- `calendar-item-label`: The slot containing an item's custom content or fallback label.
- `calendar-item-month`: A month button.
- `calendar-item-outside`: A day item belonging to an adjacent month.
- `calendar-item-range-begin`: The pending range anchor or completed range start; an alias of calendar-item-range-start.
- `calendar-item-range-clipped`: A date whose requested endpoint is adjusted by a range length limit.
- `calendar-item-range-end`: The completed or adjusted preview endpoint, which may precede the anchor during reverse selection.
- `calendar-item-range-interior`: A date inside the selected or previewed range.
- `calendar-item-range-pending`: The selected start while waiting for a range end.
- `calendar-item-range-preview`: A date in the pending range preview driven by pointer or keyboard movement.
- `calendar-item-range-start`: The pending range anchor or completed range start; an alias of calendar-item-range-begin.
- `calendar-item-range-unavailable`: A focusable endpoint whose adjusted boundary is disabled or whose range length is invalid.
- `calendar-item-today`: The item representing today.
- `calendar-item-year`: A year button.
- `clear-button`: The syn-button host for clearing the selected value.
- `clear-button__base`: The Clear control's forwarded base part.
- `content`: The calendar view content.
- `current-period-button`: The syn-button host for navigating to the current day, month, or year.
- `current-period-button__base`: The current-period control's forwarded base part.
- `day-cell`: A day table cell, independent of the button it contains.
- `day-grid`: The day-of-month table.
- `footer`: The calendar footer actions.
- `header`: The calendar header.
- `month-grid`: The month selection grid.
- `month-navigation`: The month navigation controls.
- `navigation-label`: The current month, year, or year range in the navigation header.
- `navigation-label__base`: The navigation label's forwarded button base when it offers a view switch.
- `next-button`: The next-period syn-icon-button host.
- `next-button__base`: The next-period control's forwarded base part.
- `previous-button`: The previous-period syn-icon-button host.
- `previous-button__base`: The previous-period control's forwarded base part.
- `weekday`: An individual localized weekday heading.
- `weekdays`: The weekday table heading group.
- `year-grid`: The year selection grid.
- `year-navigation`: The year navigation controls.

## Available Events

### syn-before-change

type: `SynBeforeChangeEvent`

Cancelable, detail-free event before a user commit or Clear. The host exposes the proposed value; synchronous preventDefault restores the previous value and suppresses value events. Not emitted for pending range starts, disabled, or readonly.

### syn-blur

type: `SynBlurEvent`

Emitted when focus leaves the calendar, unless disabled or readonly.

### syn-change

type: `SynChangeEvent`

Emitted after an accepted user commit or Clear, unless disabled or readonly. In range mode, choosing only the start emits syn-input but not syn-change.

### syn-clear

type: `SynClearEvent`

Emitted when the user clears a non-empty date value, unless disabled or readonly.

### syn-focus

type: `SynFocusEvent`

Emitted when focus enters the calendar, unless disabled or readonly.

### syn-input

type: `SynInputEvent`

Emitted when a user changes the selection, unless disabled or readonly.

## Dependencies

- `syn-button`
- `syn-icon-button`
