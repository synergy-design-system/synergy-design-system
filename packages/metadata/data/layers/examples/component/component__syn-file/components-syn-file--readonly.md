## Readonly

Use readonly when users should see previously selected file names but cannot replace them here. Use disabled only when file selection is unavailable.

```html
<div style="display: flex; flex-direction: column; gap: 1rem">
  <syn-file readonly="" label="This is a label"></syn-file>
  <syn-file readonly="" droparea="" label="This is a label"></syn-file>
</div>
```
