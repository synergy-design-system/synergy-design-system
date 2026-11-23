## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-radio-group
  label="This is a label"
  help-text="Choose the most appropriate option."
  name="a"
>
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```
