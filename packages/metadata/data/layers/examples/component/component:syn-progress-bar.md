## Default

Progress bars are used to show the status of an ongoing operation.

```html
<syn-progress-bar value="33.3"></syn-progress-bar>
```

---

## Labels

Use the label attribute to label the progress bar and tell assistive devices how to announce it.

```html
<syn-progress-bar value="25" label="Upload progress">25%</syn-progress-bar>
```

---

## Custom Height

Use the --height custom property to set the progress bar’s height.

```html
<syn-progress-bar
  value="50"
  style="--height: var(--syn-spacing-2x-small)"
></syn-progress-bar>
```

---

## Showing Values

Use the default slot to show a value.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-progress-bar value="60" class="progress-bar-values"
    >60%</syn-progress-bar
  >

  <div style="display: flex; gap: var(--syn-spacing-x-small)">
    <syn-button variant="outline" size="small" title="">
      <syn-icon
        name="indeterminate"
        library="system"
        label="Decrease"
        role="img"
        aria-label="Decrease"
      ></syn-icon>
    </syn-button>
    <syn-button variant="outline" size="small" title="">
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

---

## Indeterminate

The indeterminate attribute can be used to inform the user that the operation is pending, but its status cannot currently be determined. In this state, value is ignored and the label, if present, will not be shown.

```html
<syn-progress-bar indeterminate="" value="0"></syn-progress-bar>
```
