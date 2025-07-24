## Default

Progress rings are used to show the progress of a determinate operation in a circular fashion.

```html
<syn-progress-ring value="25"></syn-progress-ring>
```

---

## Size

Use the --size custom property to set the diameter of the progress ring.

```html
<syn-progress-ring value="35" style="--size: 48px"></syn-progress-ring>
```

---

## Track And Indicator Width

Use the --track-width and --indicator-width custom properties to set the width of the progress ring’s track and indicator.

```html
<syn-progress-ring
  value="50"
  style="--track-width: 4px; --indicator-width: 8px"
></syn-progress-ring>
```

---

## Colors

To change the color, use the --track-color and --indicator-color custom properties.

```html
<syn-progress-ring
  value="50"
  style="--indicator-color: var(--syn-color-success-600)"
></syn-progress-ring>
```

---

## Labels

Use the label attribute to label the progress ring and tell assistive devices how to announce it.

```html
<syn-progress-ring value="50" label="Upload progress"></syn-progress-ring>
```

---

## Showing Values

Use the default slot to show a label inside the progress ring. To display the value correctly, you should keep to a minimum width of 85 pixels.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-progress-ring value="50" class="progress-ring-values"
    >50%</syn-progress-ring
  >
  <div style="display: flex; gap: var(--syn-spacing-x-small)">
    <syn-button
      variant="outline"
      title=""
      size="medium"
      data-optional=""
      data-valid=""
    >
      <syn-icon
        name="indeterminate"
        library="system"
        label="Decrease"
        role="img"
        aria-label="Decrease"
      ></syn-icon>
    </syn-button>
    <syn-button
      variant="outline"
      title=""
      size="medium"
      data-optional=""
      data-valid=""
    >
      <syn-icon
        name="add"
        library="system"
        label="Increase"
        role="img"
        aria-label="Increase"
      ></syn-icon>
    </syn-button>
  </div>
</div>
```
