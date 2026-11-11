## Default

An inline calendar for selecting a single date, a continuous range, or multiple individual dates. Set mode to single, range, or multiple; value is a whitespace-separated list of ISO dates.

```html
<syn-calendar disabled-weekdays=""></syn-calendar>
```

---

## Localization

Set the lang attribute to display calendar labels in another language. This example shows French, Japanese, Chinese, and Spanish calendars.

```html
<div
  style="
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: var(--syn-spacing-large);
  "
>
  <syn-card>
    <span class="syn-heading--medium" slot="header">Locale: fr</span>
    <syn-calendar lang="fr"></syn-calendar>
  </syn-card>

  <syn-card>
    <span class="syn-heading--medium" slot="header">Locale: ja</span>
    <syn-calendar lang="ja"></syn-calendar>
  </syn-card>

  <syn-card>
    <span class="syn-heading--medium" slot="header">Locale: zh</span>
    <syn-calendar lang="zh"></syn-calendar>
  </syn-card>

  <syn-card>
    <span class="syn-heading--medium" slot="header">Locale: es</span>
    <syn-calendar lang="es"></syn-calendar>
  </syn-card>
</div>
```

---

## Disabled

Set the boolean disabled attribute to disable every calendar control, including day/month/year items, navigation, Today, and Clear. The calendar emits no custom events and preserves its value. The base wrapper receives calendar--disabled for styling. Programmatic assignments remain supported, and disabled takes precedence over readonly.

```html
<syn-calendar
  disabled=""
  mode="range"
  value="2026-10-07 2026-10-12"
></syn-calendar>
```

---

## Readonly

Set the boolean readonly attribute to prevent user selection and disable Clear while keeping month/year navigation, view switching, and current-period navigation available. Day hover highlights, pointer cursors, and pointer/keyboard range previews are suppressed so dates do not appear editable; navigation feedback and keyboard focus indicators remain visible. This example displays an assigned range start without allowing completion. The calendar emits no custom events, including focus and blur, and preserves its value; programmatic assignments still work. The base wrapper receives calendar--readonly for styling. Native DOM events from permitted navigation are unaffected.

```html
<syn-calendar mode="range" readonly="" value="2026-10-07"></syn-calendar>
```

---

## Sizes

The Date Picker is available in three sizes. Choose based on the surrounding layout density. Mixing sizes within the same form is not recommended.

```html
<div
  style="
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
  "
>
  <syn-calendar size="small" mode="single" value="2026-12-24"></syn-calendar>
  <syn-calendar size="medium" mode="single" value="2026-12-24"></syn-calendar>
  <syn-calendar size="large" mode="single" value="2026-12-24"></syn-calendar>
</div>
```

---

## Focus

No Description

```html
<syn-calendar value="2026-12-24"></syn-calendar>
```

---

## Min Date

The min attribute sets the earliest selectable date in the calendar. Dates before this will be visible but not selectable.

```html
<syn-calendar mode="single" min="2026-12-15" value="2026-12-24"></syn-calendar>
```

---

## Max Date

The max attribute sets the latest selectable date in the calendar. Dates after this will be visible but not selectable.

```html
<syn-calendar mode="single" max="2026-12-31" value="2026-12-24"></syn-calendar>
```

---

## Disabled Week Days

The disabled-weekdays attribute accepts a whitespace-separated list of three-letter weekday values. This example disables Saturday and Sunday while keeping October 6, 2026 selected.

```html
<syn-calendar
  disabled-weekdays="sat sun"
  mode="single"
  value="2026-10-06"
></syn-calendar>
```

---

## Disabled Dates

The disabled-dates attribute accepts a whitespace-separated list of ISO dates. Dates remain visible in the calendar but cannot be selected. This example disables Christmas Day 2026 while keeping December 24 selected.

```html
<syn-calendar
  disabled-dates="2026-12-25"
  mode="single"
  value="2026-12-24"
></syn-calendar>
```

---

## Custom Disabled Dates

Assign a synchronous function to the JavaScript-only isDateDisabled property. Return true to disable a date. This example disables every Friday that falls on the 13th, with November 2026 shown initially. The callback receives a UTC date-only Date, so use getUTCDay() and getUTCDate(). The rule is combined with min, max, disabled-dates, and disabled-weekdays: any matching rule disables the date. Load external data before assigning the callback; reassign it when captured data changes to refresh focus and availability. Custom-rule nearest-date and keyboard searches are limited to 366 days per direction, while header navigation remains available beyond that window.

```html
<syn-calendar class="custom-disabled-dates" value="2026-11-12"></syn-calendar>

<script type="module">
  const calendar = document.querySelector(".custom-disabled-dates");
  // Disables all Fridays the 13th
  calendar.isDateDisabled = (date) =>
    date.getUTCDay() === 5 && date.getUTCDate() === 13;
</script>
```

---

## Range Selection

Set mode to range and provide two whitespace-separated ISO dates. Selecting a start date begins a pending range; a second click completes it. The dates are rendered as an inclusive span.

```html
<syn-calendar mode="range" value="2026-10-06 2026-10-12"></syn-calendar>
```

---

## Range Length Constraints

Use min-range and max-range to constrain user-created ranges by inclusive calendar-day count. This example starts with October 7 selected and permits 3 to 14 days: October 7-9 is 3 days and October 7-20 is 14 days. Hovering or using arrow keys to October 8 expands the preview to October 9; moving to October 6 expands it backward to October 5. Hovering the anchor does not guess a direction. Moving beyond October 20 keeps the preview capped there. Clicking commits the same adjusted endpoint if it is selectable. Endpoints whose adjusted boundary is disabled, or whose length remains invalid, stay focusable and previewable but cannot complete the range; they expose aria-disabled and the calendar-item-range-unavailable part. Only positive integers apply, and conflicting limits prevent completion. The limits are ignored in single and multiple modes, do not rewrite assigned values, and count disabled interior dates as part of the span.

```html
<syn-calendar
  max-range="14"
  min-range="3"
  mode="range"
  value="2026-10-07"
></syn-calendar>
```

---

## Multiple Selection

Set mode to multiple to select or remove individual dates. The value attribute contains a whitespace-separated list of ISO dates.

```html
<syn-calendar mode="multiple" value="2026-10-06 2026-10-12"></syn-calendar>
```

---

## Custom Day Content

Use a date-specific slot such as day-2026-12-24 to add custom content to a calendar day. This example adds a gift icon to December 24, 2026.

```html
<syn-calendar value="2026-12-23">
  <span slot="day-2026-12-24">🎁</span>
</syn-calendar>
```
