## Horizontal Layout

Use a horizontal layout to display the radios in a row.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-radio-group layout="horizontal" label="Small size" size="small">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
  <syn-radio-group layout="horizontal" label="Medium size" size="medium">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
  <syn-radio-group layout="horizontal" label="Large size" size="large">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
</div>
```
