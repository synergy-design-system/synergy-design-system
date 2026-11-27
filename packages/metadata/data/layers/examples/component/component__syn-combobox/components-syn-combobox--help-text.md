## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-combobox label="State" help-text="Select a State">
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```
