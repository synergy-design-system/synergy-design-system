## Sizes

Use the size attribute to change a range’s size.

```html
<div class="size-wrapper">
  <syn-range
    label="Small"
    max="100"
    min="0"
    size="small"
    value="33"
  ></syn-range>
  <syn-range
    label="Medium"
    max="100"
    min="0"
    size="medium"
    value="66"
  ></syn-range>
  <syn-range
    label="Large"
    max="100"
    min="0"
    size="large"
    value="99"
  ></syn-range>
</div>
<style>
  .size-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-medium);
  }
</style>
```
