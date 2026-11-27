## Invalid

The invalid status is used to warn the user that the input is invalid. As range validation is not supported by the browser, you will need to implement your own validation logic.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-range--invalid"
>
  <syn-range
    help-text="This is an error text"
    id="range-invalid"
    max="100"
    min="0"
    value="50"
  ></syn-range>
  <script type="module">
    const range = document.querySelector("#range-invalid");
    range.setCustomValidity("Please enter a valid value");
  </script>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-range--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
