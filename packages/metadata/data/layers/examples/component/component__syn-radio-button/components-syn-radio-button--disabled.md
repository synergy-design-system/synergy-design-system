## Disabled

Set disabled on an unavailable radio-button option and explain why it cannot be selected. Use readonly on every option when the current selection is for inspection only.

```html
<syn-radio-group label="Select an option" name="b" value="1">
  <syn-radio-button value="1" disabled="">Option 1</syn-radio-button>
  <syn-radio-button value="2" disabled="">Option 2</syn-radio-button>
  <syn-radio-button value="3">Option 3</syn-radio-button>
</syn-radio-group>
```
