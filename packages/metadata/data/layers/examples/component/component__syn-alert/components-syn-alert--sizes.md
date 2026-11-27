## Sizes

Use the size attribute to change an alert’s size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-alert variant="primary" open="" size="small">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size small</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>

  <syn-alert variant="primary" open="" size="medium">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size medium</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>

  <syn-alert variant="primary" open="" size="large">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size large</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>
</div>
```
