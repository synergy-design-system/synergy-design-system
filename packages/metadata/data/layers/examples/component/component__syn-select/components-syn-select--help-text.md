## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-select label="Experience" help-text="Please tell us your skill level.">
  <syn-option value="1">Novice</syn-option>
  <syn-option value="2">Intermediate</syn-option>
  <syn-option value="3">Advanced</syn-option>
</syn-select>
```
