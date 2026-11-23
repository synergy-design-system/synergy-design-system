## Invalid

The invalid status is used to warn the user that the Checkbox is invalid. For example, if the check is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-checkbox--invalid"
>
  <div class="custom-validity">
    <syn-checkbox required="">Invalid</syn-checkbox>
    <syn-checkbox required="" indeterminate="">Invalid</syn-checkbox>
    <syn-checkbox required="" checked="">Invalid</syn-checkbox>
  </div>
  <style>
    .custom-validity {
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-large);
    }
  </style>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-checkbox--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
