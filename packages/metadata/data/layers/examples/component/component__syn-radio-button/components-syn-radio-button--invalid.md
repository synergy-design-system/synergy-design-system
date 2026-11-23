## Invalid

The invalid status is used to warn the user that the Radio Group is invalid. For example, if the radio-button is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-radio-button--invalid"
>
  <syn-radio-group
    label="Select an option"
    name="a"
    help-text="This is required"
    required=""
  >
    <syn-radio-button value="1">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-radio-button--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
