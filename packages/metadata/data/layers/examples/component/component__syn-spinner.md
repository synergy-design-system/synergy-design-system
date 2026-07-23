## Default

Spinners are used to show the progress of an indeterminate operation.

```html
<syn-spinner></syn-spinner>
```

---

## Size

Spinners are sized based on the current font size. To change their size, set the font-size property on the spinner itself or on a parent element as shown below.

```html
<div
  style="align-items: baseline; display: flex; gap: var(--syn-spacing-large)"
>
  <syn-spinner style="font-size: var(--syn-font-size-medium)"></syn-spinner>
  <syn-spinner style="font-size: var(--syn-font-size-2x-large)"></syn-spinner>
  <syn-spinner style="font-size: 40px"></syn-spinner>
</div>
```

---

## Track Width

The width of the spinner’s track can be changed by setting the --track-width custom property.

```html
<syn-spinner style="font-size: 48px; --track-width: 8px"></syn-spinner>
```

---

## Color

The spinner’s colors can be changed by setting the --indicator-color and --track-color custom properties.

```html
<syn-spinner
  style="font-size: 48px; --indicator-color: var(--syn-color-error-600)"
></syn-spinner>
```
