## Custom Validity

Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form>
  <syn-radio-group label="Select an option" name="a" value="1">
    <syn-radio value="1">Not me</syn-radio>
    <syn-radio value="2">Me neither</syn-radio>
    <syn-radio value="3">Choose me</syn-radio>
  </syn-radio-group>
  <br />
  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
```
