## Sizes

Use the size attribute to change a detail’s size.

```html
<div
  style="display: flex; gap: var(--syn-spacing-x-small); flex-direction: column"
>
  <syn-details size="small" contained="">
    <span slot="summary">Toggle Me</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-x-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details size="medium" contained="">
    <span slot="summary">Toggle Me</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details size="large" contained="">
    <span slot="summary">Toggle Me</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-medium-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
</div>
```
