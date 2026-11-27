## Readonly

Use readonly when users need to inspect their current selection without changing it. For multiple selections, keep every selected value visible.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-select placeholder="Readonly" value="option-1" readonly="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
  <syn-select
    max-options-visible="2"
    multiple=""
    placeholder="Readonly"
    value="option-1 option-2 option-3"
    readonly=""
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
</div>
```
