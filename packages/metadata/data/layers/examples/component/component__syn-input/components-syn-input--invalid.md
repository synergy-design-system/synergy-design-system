## Invalid

The invalid status is used to warn the user that the input is invalid. For example, if the entry of text is mandatory and nothing has been entered or if a text has been entered that does not have the correct format.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-input--invalid"
>
  <syn-input
    help-text="This input is required."
    label="Label"
    placeholder="Insert text here..."
    required=""
  ></syn-input>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-input--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
