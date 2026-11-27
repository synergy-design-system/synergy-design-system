## Disabled

Use disabled only when file selection is unavailable, and explain when users can upload files. Use readonly to show previously selected file names without allowing replacement.

```html
<div style="display: flex; flex-direction: column; gap: 1rem">
  <syn-file disabled="" label="This is a label"></syn-file>
  <syn-file disabled="" droparea="" label="This is a label"></syn-file>
</div>
```
