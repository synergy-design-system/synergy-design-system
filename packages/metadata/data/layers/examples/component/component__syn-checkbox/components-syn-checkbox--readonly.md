## Readonly

Use readonly when users need to see whether an existing choice is checked but must not change it. Use disabled only when the choice is unavailable.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-checkbox name="a" value="a" readonly="">Read only content</syn-checkbox>
  <syn-checkbox name="b" value="b" readonly="" indeterminate=""
    >Read only content (indet)</syn-checkbox
  >
  <syn-checkbox name="c" value="c" readonly="" checked=""
    >Read only content (checked)</syn-checkbox
  >
</div>
```
