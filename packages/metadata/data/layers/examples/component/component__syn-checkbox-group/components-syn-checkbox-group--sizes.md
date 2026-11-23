## Sizes

The size of checkboxes will be determined by the checkbox group’s size attribute.

```html
<div class="demo-checkbox-group-grid">
  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="vertical"
      label="Small size vertical"
      size="small"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>
  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="horizontal"
      label="Small size horizontal"
      size="small"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>

  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="vertical"
      label="Medium size vertical"
      size="medium"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>
  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="horizontal"
      label="Medium size horizontal"
      size="medium"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>

  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="vertical"
      label="Large size vertical"
      size="large"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>
  <div class="demo-checkbox-group-tile">
    <syn-checkbox-group
      layout="horizontal"
      label="Large size horizontal"
      size="large"
    >
      <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

      <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
    </syn-checkbox-group>
  </div>
</div>
<style>
  .demo-checkbox-group-grid {
    column-gap: var(--syn-spacing-large);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  .demo-checkbox-group-tile {
    background: var(--syn-page-background);
    padding: var(--syn-spacing-large);
    box-sizing: border-box;
    height: 100%;
  }
</style>
```
