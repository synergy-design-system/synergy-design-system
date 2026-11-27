## Invalid

The invalid status is used to warn the user that the Switch is invalid.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-switch--invalid"
>
  <syn-switch required="">Option</syn-switch>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-switch--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
