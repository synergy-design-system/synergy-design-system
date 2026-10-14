# syn-date-picker

## Summary

A date picker component for selecting dates.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-date-picker--docs)

## Class Information

- **Tag Name:** `syn-date-picker`
- **Import Example:** `import SynDatePicker from '@synergy-design-system/components/components/date-picker/date-picker.js';`

## Usage Information

- **Status:** experimental
- **Since:** 0.0.0

## Available Slots

- `label`: The input's label. Alternatively, you can use the `label` attribute.
- `help-text`: The input's help text. Alternatively, you can use the `help-text` attribute.
- `prefix`: Used to prepend a presentational icon or similar element to the date field.
- `suffix`: Used to append a presentational icon or similar element to the date field.
- `expand-icon`: The icon used by the calendar toggle button.
- `day-YYYY-MM-DD`: Forwarded to the calendar to replace a date's label.
- `month-0`: Forwarded to the calendar to replace January's label; month-1 through month-11 replace the other months.
- `year-YYYY`: Forwarded to the calendar to replace a year's label.

## Available Properties

### clearable

attribute: `clearable`
reflects: no
type: `boolean`
default: `false`

Adds a clear button when the select is not empty.

### defaultValue

attribute: -
reflects: -
type: `string`
default: `''`

The default value of the form control. Primarily used for resetting the form control.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the input.

### disabledDates

attribute: `disabled-dates`
reflects: no
type: `string[]`
default: `[]`

ISO dates that cannot be selected, using the calendar's attribute converter.

### disabledWeekdays

attribute: `disabled-weekdays`
reflects: no
type: `CalendarWeekday[]`
default: `[]`

Disabled ISO weekday names, using the calendar's attribute converter.

### form

attribute: `form`
reflects: yes
type: `string`
default: `''`

By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
the same document or shadow root for this to work.

### helpText

attribute: `help-text`
reflects: no
type: `string`
default: `''`

The input's help text. If you need to display HTML, use the `help-text` slot instead.

### isDateDisabled

attribute: -
reflects: -
type: `CalendarDateDisabledPredicate | undefined`
default: none

An additional synchronous rule receiving a UTC date-only Date, shared with the calendar.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The input's label. If you need to display HTML, use the `label` slot instead.

### max

attribute: `max`
reflects: no
type: `string`
default: `''`

The latest selectable date as an ISO YYYY-MM-DD string.

### maxRange

attribute: `max-range`
reflects: no
type: `number | undefined`
default: none

Maximum inclusive length for user-created ranges; ignored outside range mode.

### min

attribute: `min`
reflects: no
type: `string`
default: `''`

The earliest selectable date as an ISO YYYY-MM-DD string.

### minRange

attribute: `min-range`
reflects: no
type: `number | undefined`
default: none

Minimum inclusive length for user-created ranges; ignored outside range mode.

### mode

attribute: `mode`
reflects: yes
type: `CalendarSelectionMode`
default: `'single'`

The calendar selection mode; changing modes uses the calendar's normalization policy.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the input, submitted as a name/value pair with form data.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether the calendar is open. Use this attribute or the `show()` and `hide()` methods.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Makes the input readonly.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

Makes the input a required field.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The input's size.

### value

attribute: `value`
reflects: no
type: `string`
default: `''`

Whitespace-separated ISO dates: one date in single mode, two endpoints in range mode,
or distinct sorted dates in multiple mode. One range endpoint represents a pending selection.
Partial segment groups are retained for editing but excluded from this canonical value.

### valueAsDates

attribute: -
reflects: -
type: `Date[]`
default: none

Sets selected UTC date-only Date instances without emitting user value events.

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the date picker.

### checkValidity()

parameters: -
returns: `void`

Checks validity without showing a browser validation message.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Focuses the first empty date segment, or the last active segment for a complete date.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if any.

### hide()

parameters: -
returns: `void`

Hides the calendar.

### reportValidity()

parameters: -
returns: `void`

Shows the browser validation message when the date is invalid.

### setCustomValidity()

parameters: `message: string`
returns: `void`

Sets a custom validation message, or clears it with an empty string.

### show()

parameters: -
returns: `void`

Shows the calendar unless the date picker is disabled or readonly.

## Available CSS Parts

- `base`: The segmented field's wrapper.
- `calendar`: The calendar component.
- `calendar__base`: The calendar's base wrapper.
- `calendar__calendar-item`: A day, month, or year button.
- `calendar__calendar-item-active`: An active calendar item.
- `calendar__calendar-item-day`: A day button.
- `calendar__calendar-item-disabled`: A disabled calendar item.
- `calendar__calendar-item-label`: An item's custom content slot or fallback label.
- `calendar__calendar-item-month`: A month button.
- `calendar__calendar-item-outside`: A day item belonging to an adjacent month.
- `calendar__calendar-item-range-begin`: The pending anchor or completed range start; an alias of range-start.
- `calendar__calendar-item-range-clipped`: A date whose requested endpoint is adjusted by a range length limit.
- `calendar__calendar-item-range-end`: The completed or adjusted preview endpoint, including reverse selections.
- `calendar__calendar-item-range-interior`: A date inside the selected or previewed range.
- `calendar__calendar-item-range-interior-end`: The last interior date of a completed range, excluding its endpoints.
- `calendar__calendar-item-range-interior-start`: The first interior date of a completed range, excluding its endpoints.
- `calendar__calendar-item-range-pending`: The selected start while waiting for a range end.
- `calendar__calendar-item-range-preview`: A date in the pending pointer or keyboard range preview.
- `calendar__calendar-item-range-preview-end`: The last preview date, excluding the anchor but including the prospective endpoint.
- `calendar__calendar-item-range-preview-start`: The first preview date, excluding the anchor but including the prospective endpoint.
- `calendar__calendar-item-range-start`: The pending anchor or completed range start; an alias of range-begin.
- `calendar__calendar-item-range-unavailable`: An endpoint whose adjusted boundary is disabled or range length invalid.
- `calendar__calendar-item-today`: The item representing today.
- `calendar__calendar-item-year`: A year button.
- `calendar__clear-button`: The control for clearing the selected value.
- `calendar__clear-button__base`: The Clear control's forwarded base part.
- `calendar__content`: The calendar view content.
- `calendar__current-period-button`: The control for navigating to the current day, month, or year.
- `calendar__current-period-button__base`: The current-period control's forwarded base part.
- `calendar__day-cell`: A day table cell, independent of its button.
- `calendar__day-grid`: The day-of-month table.
- `calendar__footer`: The calendar footer actions.
- `calendar__header`: The calendar header.
- `calendar__month-grid`: The month selection grid.
- `calendar__month-navigation`: The month navigation controls.
- `calendar__navigation-label`: The current month, year, or year range in the navigation header.
- `calendar__navigation-label__base`: The navigation label's forwarded button base when it offers a view switch.
- `calendar__next-button`: The next-period icon button host.
- `calendar__next-button__base`: The next-period control's forwarded base part.
- `calendar__previous-button`: The previous-period icon button host.
- `calendar__previous-button__base`: The previous-period control's forwarded base part.
- `calendar__weekday`: An individual localized weekday heading.
- `calendar__weekdays`: The weekday table heading group.
- `calendar__year-grid`: The year selection grid.
- `calendar__year-navigation`: The year navigation controls.
- `expand-button`: The calendar toggle button.
- `expand-icon`: The container that wraps the expand icon.
- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The input and popup wrapper.
- `form-control-label`: The label's wrapper.
- `input`: The group containing editable date segments.
- `popup`: The popup's exported container.
- `prefix`: The container that wraps the prefix slot.
- `range-separator`: The separator between start and end date groups.
- `remove-date-button`: A multiple-selection date's remove button.
- `segment`: An editable day, month, or year spinbutton.
- `segment-literal`: A locale-specific separator between fields.
- `suffix`: The container that wraps the suffix slot.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the calendar is hidden.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the calendar is visible and positioned.

### syn-before-change

type: `SynBeforeChangeEvent`

Cancelable event before a user commit or Clear. The picker exposes the proposed value; preventing default restores the previous value. Pending range starts emit only syn-input.

### syn-blur

type: `SynBlurEvent`

Emitted when focus leaves the date picker.

### syn-change

type: `SynChangeEvent`

Emitted when an edit changes the canonical ISO value or a calendar selection is committed.

### syn-clear

type: `SynClearEvent`

Emitted when the calendar clears a non-empty selection.

### syn-focus

type: `SynFocusEvent`

Emitted when focus enters the date picker.

### syn-hide

type: `SynHideEvent`

Emitted when the calendar closes.

### syn-input

type: `SynInputEvent`

Emitted when the user edits a segment or selects a date.

### syn-invalid

type: `SynInvalidEvent`

Emitted when constraint validation fails.

### syn-show

type: `SynShowEvent`

Emitted when the calendar opens.

## Dependencies

- `syn-calendar`
- `syn-icon`
- `syn-popup`
