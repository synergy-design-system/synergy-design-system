## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-range
  help-text="Controls the volume of the current song"
  label="Volume"
  max="100"
  min="0"
  value="50"
></syn-range>
```
