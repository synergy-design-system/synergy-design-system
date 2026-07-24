## Default

The default pagination offers the most comprehensive controls and is optimized for tables, lists, and complex data views. It is intended for use cases where users need to adjust both the number of displayed rows and the active page. The navigation controls allow switching between pages as well as jumping directly to the first or last page.

```html
<syn-pagination
  current-page="1"
  page-size="25"
  page-size-options="10, 25, 50, 100"
  total-items="500"
></syn-pagination>
```

---

## With Divider

An optional divider can be shown to provide visual separation depending on the layout needs.

```html
<syn-pagination
  divider=""
  current-page="2"
  page-size="25"
  total-items="500"
></syn-pagination>
```

---

## Disabled

Use the disabled attribute to disable all interactive elements like syn-select, syn-input, and the previous and next syn-icon-buttons. This can be useful if you want to prevent the user from entering something again immediately after an entry before the first entry has been processed.

```html
<syn-pagination
  disabled=""
  current-page="1"
  page-size="25"
  total-items="500"
></syn-pagination>
```

---

## Compact

The compact variant focuses on essential pagination controls and fits tight layouts or mobile environments. Use this variant when space is limited or page size stays fixed.

```html
<syn-pagination
  variant="compact"
  current-page="1"
  page-size="25"
  total-items="500"
></syn-pagination>
```

---

## Sizes

Use the size attribute to change the pagination size.

```html
<div
  style="
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-2x-large);
  "
>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="small"
  ></syn-pagination>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="medium"
  ></syn-pagination>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="large"
  ></syn-pagination>
</div>
```
