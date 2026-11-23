## Readonly

Use readonly to display an existing on/off setting that users may inspect but cannot toggle here. Use disabled only when the setting is unavailable.

```html
<div
  style="
    display: flex;
    gap: var(--syn-spacing-large);
    flex-direction: column;
    align-items: flex-start;
  "
>
  <syn-switch readonly="">Unchecked</syn-switch>
  <syn-switch checked="" readonly="">Checked</syn-switch>
</div>
```
