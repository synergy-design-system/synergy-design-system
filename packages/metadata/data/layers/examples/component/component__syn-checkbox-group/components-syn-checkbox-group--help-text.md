## Help Text

Add descriptive help text to a checkbox-group with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-checkbox-group
  label="This is a label"
  help-text="Choose the most appropriate option."
>
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```
