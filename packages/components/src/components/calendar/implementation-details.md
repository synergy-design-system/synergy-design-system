# Implementation Details

This file holds all deviatons and observations from design to code so we can apply those to Figma later.

Use the checklists to indicate:

- For Doings, checked items are agreed
- For Observations, checked items are agreed and done in Figma

## Review

This is a source review of `syn-calendar` and `syn-date-picker`, recorded before the planned interaction tests are added. Items below are risks or decisions to resolve, not all confirmed runtime failures.

### Resolution Contract (2026-10-15)

The findings below are the original review, not a description of the current implementation. The following decisions were agreed and implemented in source. Automated tests, builds, device testing, and screen-reader verification remain pending; static checks do not establish runtime coverage.

- **Committed values and drafts:** unfinished/impossible segment input keeps the committed selection. Complete real dates commit on segment completion; typed years require four digits. An explicitly invalid day stays visible rather than being reinterpreted or corrected. A completed month/year edit may clamp an existing day to the month's last day, but not a day explicitly being edited.
- **Typed constraints:** real typed/pasted/assigned dates and ranges are preserved even when constraints make them invalid. Normal validated submission is blocked; `novalidate` semantics remain native. Calendar gestures continue to reject disabled dates and snap range lengths.
- **Range and multiple:** picker ranges publish both endpoints atomically, while the standalone calendar retains its pending single-endpoint API. Multiple edits commit per date. Visible groups retain identity/order while editing and reconcile on whole-picker blur; public values normalize immediately. Empty add-date groups are not invalid drafts.
- **Paste:** ISO dates/lists (whitespace, commas, semicolons) and single locale-ordered numeric dates with four-digit years are supported. Recognizable impossible input stays as a draft. Unrecognized/ambiguous text is ignored. Lists are atomic; a failed member keeps the batch pending. Paste replaces the active group, or the range pair when two dates are supplied, preserving unrelated groups.
- **Application updates:** new external values replace drafts; same-value echoes preserve them. Mode changes discard drafts. Explicit mode/value replacements win over implicit conversion. Range-to-multiple keeps endpoints only, never expands the interior. Application replacements during `syn-before-change` supersede the user proposal; identical candidate writes acknowledge it without bypassing cancellation.
- **Clear and events:** both Clear controls use the same cancelable pipeline and preserve popup state. Clear is also available for started drafts. Accepted Clear emits `syn-clear`, `syn-input`, and `syn-change` only when the committed value changed. Draft input can emit `syn-input` with unchanged `value`. Programmatic updates and reset emit no user value events. Rollback preserves unrelated drafts.
- **Validation:** validity remains truthful while error styling waits for whole-picker blur or explicit reporting. `checkValidity()` does not reveal error styling. Explicit reporting focuses a usable segment. Optional empty controls are valid absent custom errors; required controls need a complete selection. Reset restores defaults and clears drafts/exposure, but preserves application custom validity until explicitly cleared.
- **Forms:** the picker implements `SynergyFormControl` and uses the existing controller. It submits one named whitespace-separated ISO string in every mode; named optional empty fields submit an empty string. Disabled fields are omitted. Readonly fields submit committed values without blocking validation.
- **Keyboard:** Enter closes an open popup first; with the popup already closed it requests normal validated form submission. Escape closes first, then discards drafts when the popup is already closed. Whole-picker blur retains unfinished drafts. Horizontal navigation follows visual direction in RTL; calendar vertical keys remain row-based.
- **Readonly/disabled:** entering either state closes the popup and discards uncommitted work without changing committed selection. Stored custom validity survives. Readonly picker browsing is disabled; the standalone readonly calendar still allows navigation.
- **Popup and focus:** interrupted/superseded popup calls resolve without fabricated after-events. Async focus checks current state. Calendar focus normalization does not redirect usable header/footer focus. Nested picker blur reaches the actual focused element.
- **Locale:** use `lang`, not `locale`. Gregorian field order and separators follow the effective regional locale, including runtime changes. Calendar and picker use the same locale. Malformed tags fall back to English; ISO values do not change. Locale layouts/field-name formatters are cached, not predicate results.
- **Bounds/failures:** supported years are `0000` through `9999`; navigation stops at domain boundaries. Duplicate weekdays use set membership. Throwing predicates make the affected date unavailable, preserve selections, and report once per callback; fresh checks can recover.
- **Styling:** diagnostic colors were replaced with tokens, the public width override is restored, selected/preview fades retain distinct boundary parts, and segment dimensions remain stable. Calendar parts stay forwarded under `calendar__`.

### Deferred Work And Verification

- Noneditable span-based segments remain desktop keyboard-driven spinbuttons. Native mobile keyboards, caret/text selection, dictation, and complete IME text-entry support are not guaranteed. Native-input/contenteditable replacement is a separately scoped future feature; desktop accessibility still needs manual verification.
- The shared form controller's whole-form validation scan for externally associated controls is intentionally unchanged. Direct picker validation and existing association/submission/reset remain supported; do not claim the inherited scan limitation is fixed.
- Add regression coverage later for leap-day and short-year entry, impossible drafts, reverse/same-day ranges, duplicate multiple dates, atomic invalid paste, canceled/superseded proposals, Clear/reset, Enter/Escape, locale/RTL switching, popup interruption, callback recovery, domain edges, and all themes/sizes/parts. No tests or builds were run for this implementation.

### High Priority

- **Keep partial segment edits separate from committed dates.** The date picker currently commits each digit. Its day-clamping and range-limit logic can alter another field or endpoint while a user is still entering a year. For example, typing into a leap-day year can clamp February 29 to February 28 on the first digit and not restore it when the final year is entered. Define a draft/commit policy before finalizing manual range entry.
- **Unify clear behavior.** The picker clear button currently bypasses `syn-before-change`, clears without `syn-input`/`syn-change`, and does not restore focus. Calendar Clear follows another event path and the picker may emit `syn-clear` before synchronizing its value. Route both actions through one cancelable clear operation with consistent value, event order, and focus behavior.
- **Clarify `mode` and `value` conversion precedence.** The picker always converts its existing value on a mode change. If callers set `mode="multiple"` and provide a new two-date value together after range mode, range-to-multiple conversion can expand the two dates into all dates between them. Match the calendar's distinction between mode-only conversion and an explicitly replaced value.
- **Make popup completion promises settle on interrupted transitions.** `show()` and `hide()` wait for after-events, while open-change handling may return without emitting one if the state changes during the transition. Rapid toggles, or disabling while opening, can leave callers waiting indefinitely. Define completion or cancellation for every transition.
- **Finish the accessible input contract before release.** Date segments are non-editable spans with `inputmode`, which is not a reliable mobile text-entry mechanism. Segment accessible names do not include the field's main label; the dialog name can also be absent when the label is supplied by a slot. Expose selected/current-day state on calendar items and verify keyboard and screen-reader behavior, including focus after validation failure.

### Medium Priority

- **Match native/Synergy Enter behavior.** Segment Enter currently closes the calendar and prevents default. `syn-input` submits through the form controller when Enter is pressed without modifiers. Define Enter behavior for an open calendar versus a closed field, and respect composition and form submission.
- **Keep multiple-mode display and canonical value synchronized.** The committed string is sorted and deduplicated, but segment groups can retain duplicate or unsorted visible dates after editing. Reconcile groups after a commit while preserving the active draft.
- **Normalize constraint inputs before using array lengths.** Search code treats seven disabled-weekday entries as all weekdays; seven duplicates of one weekday can therefore make every date appear unavailable. Use the prepared weekday set consistently.
- **Define the supported year domain for navigation.** Public parsing accepts four-digit ISO years, but calendar year navigation can reach values outside that domain. Keep navigation and displayed values within the same supported range.
- **Review RTL keyboard navigation.** Day and period arrow-key offsets are fixed to LTR directions. Decide whether horizontal keys follow visual direction in RTL, then apply that policy across day, month, and year grids and the segmented input.
- **Avoid moving focus from a navigation control during normalization.** Constraint/value changes normalize focus and may request grid restoration whenever focus is anywhere within the calendar. Preserve a focused header/footer control unless that control itself becomes unavailable.
- **Complete focus semantics for the picker.** `blur()` only blurs the immediate shadow-root active element; if focus is in the nested calendar, it may not release the deepest focused control. Confirm `focus()` and `blur()` behavior for segments, popup controls, and programmatic calls.
- **Make typed constraint handling consistent with calendar selection.** Calendar clicks reject disabled dates; typed values remain in the field and become invalid. Decide whether that difference is intentional and document the chosen editing/validation behavior.
- **Clarify the submitted value format.** Range and multiple values are one whitespace-separated ISO string in form data, not repeated values. Document and validate this contract for consumers.
- **Account for externally associated controls in whole-form validation.** The shared form controller registers controls associated through `form`, but its whole-form `checkValidity()`/`reportValidity()` fallback scans descendants. An externally associated control is not a descendant and may be omitted by that scan. This is a shared form-controller limitation, not unique to the date picker.

### Styling And Documentation

- **Remove diagnostic colors before release.** The calendar stylesheet still has hotpink outside-day outlines and a red disabled background; replace them with intentional theme tokens.
- **Repair the range fade rules.** The LTR completed-range start selector is missing, while preview boundaries and completed boundaries need different semantics. Verify fades for reverse selection, one-cell interiors, previews, row boundaries, and RTL.
- **Restore the documented calendar width hook.** The calendar documents `--syn-calendar-min-width`, but the current stylesheet uses the internal `--calendar-min-width` and does not consume the public token. Either restore the public override or revise the documented contract.
- **Verify picker CSS token names and segment sizing.** The picker references `--syn-color-input-text`; confirm this token exists in supported themes. The current segment rules omit the former fixed widths, so check that localized fields do not resize or overflow at all sizes and in range/multiple modes.
- **Document and demonstrate variants.** Calendar stories cover many selection and constraint variants, but need focused keyboard, RTL, unavailable-range, and focus-restoration examples. Date picker stories currently have Default and Demo only. Add dedicated examples for single/range/multiple, range limits, disabled/readonly, localization, form reset/association/validation, cancellation, clear, and segment keyboard behavior. Replace the date-picker metadata TODO guidance with usage and accessibility guidance.
- **Keep public API metadata aligned.** Recheck component annotations, generated metadata, framework wrappers, and story controls whenever a property, event, slot, or forwarded part changes. The date picker should document its full forwarded calendar styling API and event semantics.

### Resilience And Performance

- **Cache locale-derived segment layout.** `Intl.DateTimeFormat` and `Intl.DisplayNames` are constructed during rendering and interaction. Cache by resolved locale (and numbering/calendar options) or prepare them when locale changes.
- **Reduce redundant calendar updates during drafts.** Every typed digit emits input and changes parent state, which rerenders the nested calendar. Consider syncing only when the committed selection changes, while retaining immediate field validity and draft feedback.
- **Avoid repeated availability scans within one render/action.** Month/year availability and navigation can call disabled-date predicates across large periods. Share a prepared constraint snapshot and availability results for that operation; do not persist callback results across updates without invalidation.
- **Bound range-to-multiple expansion.** Converting a large assigned range to individual dates can synchronously allocate a very large array. Define a maximum or reject/avoid eager expansion for ranges beyond a documented threshold.
- **Define predicate failure behavior.** A consumer-supplied `isDateDisabled` exception currently propagates through rendering and navigation. Decide whether to surface it, isolate it to the affected date, or report it through a documented error path.
- **Clarify unsupported locale handling.** Invalid locale tags can throw from `Intl` during render. Normalize/fallback the locale or document that `lang` must be a valid BCP 47 tag.

### Form Association Comparison

- The picker already uses `FormControlController` with the same `syn-blur`/`syn-input` interaction policy as `syn-input`, and exposes name/value/default value, disabled/required, form association, validity methods, and reset integration.
- `syn-input` explicitly implements `SynergyFormControl`; consider doing the same for the date picker so TypeScript checks the complete form-control contract.
- Add behavior checks for named submission in all modes, external `form` association, reset restoring the default value and clearing draft buffers, disabled exclusion, readonly semantics, `required`, incomplete range validation, custom validity, Enter submission, and cancelable changes.
- Confirm that native validation focuses a usable segment rather than the clipped internal validation input. Keep invalid-state timing aligned with `syn-input` so incomplete drafts do not show errors prematurely.

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
