## With Buttons

One of the most common use cases for badges is attaching them to buttons. DEV: To make this easier, badges will be automatically positioned at the top-right when they’re a child of a button.

```html
<div style="display: flex; gap: var(--syn-spacing-2x-large)">
  <syn-button>
    Requests
    <syn-badge pill="">30</syn-badge>
  </syn-button>

  <syn-button>
    Warnings
    <syn-badge variant="warning" pill="">8</syn-badge>
  </syn-button>

  <syn-button>
    Errors
    <syn-badge variant="error" pill="">6</syn-badge>
  </syn-button>
</div>
```
