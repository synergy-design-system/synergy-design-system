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

### Range Length

- `min-range` and `max-range` constrain user completion only in range mode, counting both endpoints and all interior calendar days.
- Omitted, non-positive, fractional, or non-finite limits are ignored. A positive minimum greater than the maximum prevents completion.
- Preview and completion are capped at `max-range` in either direction. Clicking farther away commits the capped endpoint only if it passes date constraints; focus returns to that endpoint.
- Preview and completion expand to `min-range` in the movement direction when a nearer endpoint is requested. Hovering the anchor does not guess a direction, and a same-day completion must still satisfy the minimum.
- Endpoints whose adjusted boundary is disabled, or whose length remains invalid, stay focusable and previewable with `aria-disabled` and `calendar-item-range-unavailable`; native disabled state still depends only on date constraints.
- Invalid completion retains the pending start and emits no value events. Programmatic and already-completed values remain unchanged when limits change.

### Interaction States

- `disabled` and `readonly` are reflected boolean properties and preserve the existing selection.
- The base wrapper exposes `calendar--disabled` and `calendar--readonly`; both may be present, with disabled behavior taking precedence.
- Disabled uses native disabled controls and an inert wrapper, guards interaction handlers, clears previews, and prevents navigation/focus restoration.
- Readonly blocks user selection and Clear, suppresses day hover/cursor feedback and pending selection previews, and retains navigation, view switching, and keyboard focus indicators.
- Calendar custom events, including focus/blur, are suppressed in either state; permitted native DOM events are not suppressed.
- Programmatic property/value updates remain supported, and removing a state does not automatically steal focus.

### Internal Boundaries

- `utility/date.ts` handles date codecs, locale formatting, and calendar grids.
- `utility/constraints.ts` handles date rules and bounded searches. Availability functions receive a prepared constraint object rather than positional bound lists.
- Prepared constraints use per-action/render membership indexes, retaining the original arrays for search-window policy. Callback results are not persistently cached.
- `utility/selection.ts` handles value normalization and derives range endpoints, user selection proposals, and day item states. Preview, cell affordances, and completion share the same endpoint policy.
- `utility/navigation.ts` calculates view/focus patches and nearest period candidates; only the component applies Lit state, dispatches events, and restores DOM focus.
- `utility/events.ts` suppresses nested native focus events without a component dependency.
- The component and renderers import helpers through `utility/index.ts`; utility modules use direct sibling imports to avoid barrel cycles.
- User selection requests distinguish pending, committed, and Clear updates by name rather than positional boolean flags.
- Renderers keep the existing markup, slots, classes, and parts, deriving class and part names from a shared item-state descriptor.
- The component holds a single active-view focus intent and local render snapshots. Public declarations remain Temporal-free.

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
