## Setting A Custom Width

As expected, buttons can be given a custom width by setting the width attribute. This is useful for making buttons span the full width of their container on smaller screens.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-button size="small" style="width: 100%">Small</syn-button>
  <syn-button size="medium" style="width: 100%">Medium</syn-button>
  <syn-button size="large" style="width: 100%">Large</syn-button>
</div>
```
