## Custom Track Colors

You can customize the active and inactive portions of the track using the --track-color-active and --track-color-inactive custom properties.

```html
<syn-range class="custom-track-color" max="100" min="0" value="50"></syn-range>
<style>
  .custom-track-color {
    --track-color-active: var(--syn-color-success-700);
  }
</style>
```
