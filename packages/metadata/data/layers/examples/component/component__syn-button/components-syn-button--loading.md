## Loading

Use the loading attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button variant="filled" loading="">Filled</syn-button>
  <syn-button variant="outline" loading="">Outline</syn-button>
  <syn-button variant="text" loading="">Text</syn-button>
</div>
```
