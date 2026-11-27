## Setting Initial Value

Use the value attribute to set the initial selection.When using multiple, the value attribute uses space-delimited values to select more than one option. Because of this, <syn-option> values cannot contain spaces. If you’re accessing the value property through Javascript, it will be an array.

```html
<syn-combobox
  value="option-1 option-2 option-3"
  multiple=""
  clearable=""
  max-options-visible="2"
>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-option value="option-4">Option 4</syn-option>
  <syn-option value="option-5">Option 5</syn-option>
  <syn-option value="option-6">Option 6</syn-option>
</syn-combobox>
```
