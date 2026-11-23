## With Empty Content

Badges can be used without content to just show an status indicator.

```html
<div
  style="display: flex; position: relative; gap: var(--syn-spacing-3x-large)"
>
  <syn-popup active="" distance="-3" placement="right-start" skidding="-12">
    <syn-icon
      name="wallpaper"
      style="font-size: var(--syn-font-size-x-large)"
      slot="anchor"
    ></syn-icon>
    <syn-badge></syn-badge>
  </syn-popup>

  <syn-popup active="" distance="-10" placement="right-start" skidding="-14">
    <syn-icon
      name="wallpaper"
      style="font-size: var(--syn-font-size-x-large)"
      slot="anchor"
    ></syn-icon>
    <syn-badge>12</syn-badge>
  </syn-popup>
</div>
```
