## Invalid

The invalid status is used to warn the user that the syn-file is invalid. For example, if the entry of text is mandatory and nothing has been entered or if a text has been entered that does not have the correct format.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-file--invalid"
>
  <syn-file
    class="syn-file-invalid"
    droparea=""
    help-text="This is an error text."
    label="This is a label"
  ></syn-file>
  <script type="module">
    const files = document.querySelectorAll(".syn-file-invalid");
    files.forEach((file) => {
      file.setCustomValidity("This is an error text");
    });
  </script>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-file--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
