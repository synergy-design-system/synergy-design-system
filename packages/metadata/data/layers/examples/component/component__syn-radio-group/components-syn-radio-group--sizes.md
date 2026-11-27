## Sizes

The size of Radios and Radio Buttons will be determined by the Radio Group’s size attribute.

```html
<div class="demo-radio-group-grid">
  <div class="demo-radio-group-tile">
    <syn-radio-group layout="vertical" label="Small size vertical" size="small">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Small size horizontal"
      size="small"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>

  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="vertical"
      label="Medium size vertical"
      size="medium"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Medium size horizontal"
      size="medium"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>

  <div class="demo-radio-group-tile">
    <syn-radio-group layout="vertical" label="Large size vertical" size="large">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Large size horizontal"
      size="large"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
</div>
<style>
  .demo-radio-group-grid {
    column-gap: var(--syn-spacing-large);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  .demo-radio-group-tile {
    background: var(--syn-page-background);
    padding: var(--syn-spacing-large);
    box-sizing: border-box;
    height: 100%;
  }
</style>
```
