## Multiple

To allow multiple options to be selected, use the multiple attribute. It’s a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values.

```html
<syn-select
  label="Select a Few"
  value="Option_1 Option_2 Option_3"
  multiple=""
  clearable=""
>
  <syn-option value="Option_1">Option 1</syn-option>
  <syn-option value="Option_2">Option 2</syn-option>
  <syn-option value="Option_3">Option 3</syn-option>
  <syn-option value="Option_4">Option 4</syn-option>
  <syn-option value="Option_5">Option 5</syn-option>
  <syn-option value="Option_6">Option 6</syn-option>
</syn-select>
```
