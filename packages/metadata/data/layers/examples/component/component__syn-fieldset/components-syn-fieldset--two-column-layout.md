## Two Column Layout

For container widths of 640px or above, the nested elements within each row switch to a horizontal layout.This layout is ideal for forms with multiple fields, as it allows for a more compact and organized presentation of the form controls.Will automatically switch to a one-column layout for container widths below 640px.

```html
<syn-fieldset
  description="For container widths ≥ 640px"
  layout="two-columns"
  legend="Two column layout"
>
  <syn-input name="item-1" label="Item 1"></syn-input>
  <syn-input name="item-2" label="Item 2"></syn-input>
  <syn-input name="item-3" label="Item 3"></syn-input>
  <syn-input name="item-4" label="Item 4"></syn-input>
  <syn-input name="item-5" label="Item 5"></syn-input>
  <syn-input name="item-6" label="Item 6"></syn-input>
</syn-fieldset>
```
