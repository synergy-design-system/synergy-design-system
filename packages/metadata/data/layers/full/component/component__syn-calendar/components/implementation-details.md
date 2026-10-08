# Implementation Details

This file holds all deviatons and observations from design to code so we can apply those to Figma later.

Use the checklists to indicate:

- For Doings, checked items are agreed
- For Observations, checked items are agreed and done in Figma

## Implementation

### Date Representation

- Internal dates use ISO `PlainDate.Record` values from `temporal-polyfill/fns/PlainDate`.
- Internal months are 1-12 and weekdays are Monday=1 through Sunday=7.
- Public `value`, `min`, `max`, and disabled dates remain ISO `YYYY-MM-DD` strings.
- `valueAsDates` remains a UTC date-only `Date[]` boundary; internal calculations do not use native `Date`.
- Month buttons and slots retain their zero-based identifiers (`month-0` through `month-11`).
- Date arithmetic and formatting use the functional package API; locale week starts and selection constraints remain calendar-owned.

### Custom Disabled Dates

- `isDateDisabled` is a JavaScript-only synchronous predicate receiving a UTC date-only `Date`.
- It is combined with declarative rules; any matching rule disables a date, including range endpoints.
- Month/year availability checks inspect their finite periods. Nearest-date and keyboard searches with a custom predicate inspect at most 366 days per direction and stop without moving if nothing is found.
- Header navigation does not interpret a failed bounded search as an empty calendar, so users can navigate to more distant dates.
- Reassign the predicate after changing captured data to re-evaluate focus. `requestUpdate()` refreshes rendered availability without automatically normalizing focus.

## Doings

- [ ] For sake of easier usage and combination, we opt to create more components:
  - `syn-calendar` -> This is the "lower" path of a `syn-datepicker`. Can be used standalone to create inline calendar items.
  - `syn-date-picker` -> Form associated combination as currently documented in Figma. Properties are still missing there, will be made up on dev side.
  - `syn-time` -> Will provide the "lower" path of `syn-time-picker`. Can be used standalone to create inline date selections. Needed because we may also have `syn-date-time-picker` that includes both
  - `syn-time-picker` -> Form associated combination as currently documented in Figma. Properties are still missing there, will be made up on dev side.
  - `syn-duration` -> Will provide the "lower" path of `syn-duration-picker` (if its not an implementation detail of `syn-time-picker`!). Can be used standalone to create inline start date selections.
  - `syn-duration-picker` -> Form associated combination as currently documented in Figma. Properties are still missing there, will be made up on dev side.

## Wrapper

### Doings

- [ ] We introduced a min-width of ca. `390px` for medium size to prevent jumping when moving between views.
- [ ] We use already defined spacings for all items for now (see observations below).

### Observations

- [ ] We see that the calendar items use non default spacings.

## Header

### Doings

- [ ] We use `syn-button` and `syn-icon-button` for the header to make it accessible and provide better visibility.

### Observations

- [ ] The rounded focus border of syn-button clashes with the angular calendar item shapes

## Day Selection

### Doings

- [ ] We will show the items that are out of scope for a month and enable them to always fill the widget space
- [ ] We had to set a fixed with on date and fluid width on month selection to prevent jumping when switching betweeen months. Should be applied to design, too.

### Observation

- [ ] There is currently no design for this
- [ ] Applying focus/hover on a selected item is not shown as the background color is the same as the border color.
