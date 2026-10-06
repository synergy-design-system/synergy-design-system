## Default

A Calendar renders an inline calendar that lets users select a single date or a continuous date range. It always shows the full month in context — giving users the spatial orientation of weekdays, weeks, and adjacent months before they commit to a choice.

```html
<syn-calendar disabled-weekdays=""></syn-calendar>
```

---

## Min Date

The min attribute sets the earliest selectable date in the calendar. Dates before this will be visible but not selectable.

```html
<syn-calendar min="2026-12-15" value="2026-12-24"></syn-calendar>
```

---

## Max Date

The max attribute sets the latest selectable date in the calendar. Dates after this will be visible but not selectable.

```html
<syn-calendar max="2026-12-31" value="2026-12-24"></syn-calendar>
```

---

## Disabled Week Days

The disabled-weekdays attribute accepts a whitespace-separated list of three-letter weekday values. This example disables Saturday and Sunday while keeping October 6, 2026 selected.

```html
<syn-calendar disabled-weekdays="sat sun" value="2026-10-06"></syn-calendar>
```

---

## Disabled Dates

The disabled-dates attribute accepts a whitespace-separated list of ISO dates. Dates remain visible in the calendar but cannot be selected. This example disables Christmas Day 2026 while keeping December 24 selected.

```html
<syn-calendar disabled-dates="2026-12-25" value="2026-12-24"></syn-calendar>
```
