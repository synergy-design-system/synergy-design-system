## Multiple

To allow multiple options to be selected, use the multiple attribute. It’s a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values. Use the max-options-visible attribute to define the maximum number of selected options that will be visible. After the maximum, "+n" will be shown to indicate the number of additional items that are selected.

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
