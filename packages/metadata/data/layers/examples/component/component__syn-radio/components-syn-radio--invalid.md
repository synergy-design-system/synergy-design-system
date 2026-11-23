## Invalid

The invalid status is used to warn the user that the Radio is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-radio--invalid"
>
  <syn-radio-group required="">
    <syn-radio value="1">Invalid</syn-radio>
    <syn-radio value="">Invalid</syn-radio>
  </syn-radio-group>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-radio--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
