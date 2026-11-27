## Invalid

The invalid status is used to warn the user that the Select is invalid. For example, if the entry of text is mandatory and nothing has been entered.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-select--invalid"
>
  <syn-select label="Select one" required="">
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-select--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
