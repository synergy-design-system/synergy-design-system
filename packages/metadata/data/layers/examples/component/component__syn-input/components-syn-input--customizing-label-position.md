## Customizing Label Position

Use to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.

```html
<syn-input
  class="label-on-left"
  label="Name"
  help-text="Enter your name"
></syn-input>
<syn-input
  class="label-on-left"
  label="Email"
  type="email"
  help-text="Enter your email"
></syn-input>
<syn-textarea
  class="label-on-left"
  label="Bio"
  help-text="Tell us something about yourself"
></syn-textarea>

<style>
  .label-on-left {
    --label-width: 3.75rem;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--syn-spacing-medium);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--syn-spacing-3x-small) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
    margin-bottom: 0;
  }

  .label-on-left::part(form-control-help-text) {
    grid-column-start: 2;
  }
</style>
```
