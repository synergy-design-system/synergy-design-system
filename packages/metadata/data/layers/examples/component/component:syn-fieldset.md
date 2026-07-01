## Default

Fieldset is a component used to group related form controls and labels. It provides a visual and semantic grouping for better accessibility and organization.

```html
<syn-fieldset
  description="Description text for the fieldset. This is optional and can be used to provide additional information about the fieldset."
  legend="Legend"
>
  <syn-input name="item-1" label="Item 1"></syn-input>
  <syn-input name="item-2" label="Item 2"></syn-input>
  <syn-input name="item-3" label="Item 3"></syn-input>
</syn-fieldset>
```

---

## One Column Layout

The one-column layout applies to container widths below 640px and stacks the nested elements within a row. Overall, please make sure that no more than two items are nested within a single row.

```html
<syn-fieldset
  description="For container widths &lt; 640px"
  layout="one-column"
  legend="One column layout"
>
  <syn-input name="item-1" label="Item 1"> </syn-input>

  <syn-input name="item-2" label="Item 2"> </syn-input>

  <syn-input name="item-3" label="Item 3"> </syn-input>

  <syn-input name="item-4" label="Item 4"> </syn-input>

  <syn-input name="item-5" label="Item 5"> </syn-input>

  <syn-input name="item-6" label="Item 6"> </syn-input>
</syn-fieldset>
```

---

## Two Column Layout

For container widths of 640px or above, the nested elements within each row switch to a horizontal layout.This layout is ideal for forms with multiple fields, as it allows for a more compact and organized presentation of the form controls.Will automatically switch to a one-column layout for container widths below 640px.

```html
<syn-fieldset
  description="For container widths ≥ 640px"
  layout="two-columns"
  legend="Two column layout"
>
  <syn-input name="item-1" label="Item 1"> </syn-input>

  <syn-input name="item-2" label="Item 2"> </syn-input>

  <syn-input name="item-3" label="Item 3"> </syn-input>

  <syn-input name="item-4" label="Item 4"> </syn-input>

  <syn-input name="item-5" label="Item 5"> </syn-input>

  <syn-input name="item-6" label="Item 6"> </syn-input>
</syn-fieldset>
```

---

## Item Spacing

Use an item-spacing of "dense" to force a smaller spacing between nested elements. Useful for checkboxes, switches, and radio buttons.

```html
<syn-fieldset layout="two-columns" legend="Item spacing" item-spacing="dense">
  <syn-checkbox name="checkbox-1">Checkbox 1</syn-checkbox>
  <syn-checkbox name="checkbox-2">Checkbox 2</syn-checkbox>
  <syn-checkbox name="checkbox-3">Checkbox 3</syn-checkbox>
  <syn-checkbox name="checkbox-4">Checkbox 4</syn-checkbox>
  <syn-checkbox name="checkbox-5">Checkbox 5</syn-checkbox>
</syn-fieldset>
```

---

## Group Aware

Enable the group-aware toggle to ensure nested elements (like syn-radio-group) align with the fieldset spacing and remain readable across breakpoints.

```html
<syn-fieldset
  description="Direct child radio groups get inline option layout automatically."
  group-aware=""
  layout="two-columns"
  legend="Group-aware fieldset"
  item-spacing="dense"
>
  <syn-radio-group label="Contact Topic">
    <syn-radio value="offer">Inquiry/offer</syn-radio>
    <syn-radio value="invoice">Orders/invoices</syn-radio>
    <syn-radio value="complaint">Returns/complaint</syn-radio>
    <syn-radio value="docs">Documentation/CAD</syn-radio>
  </syn-radio-group>
</syn-fieldset>
```

---

## Disabled

Enable the disabled toggle to disable all nested elements simultaneously.

```html
<syn-fieldset disabled="" layout="two-columns" legend="Disabled fieldset">
  <syn-input name="item-1" label="Item 1"> </syn-input>

  <syn-input name="item-2" label="Item 2"> </syn-input>

  <syn-input name="item-3" label="Item 3"> </syn-input>

  <syn-input name="item-4" label="Item 4"> </syn-input>

  <syn-input name="item-5" label="Item 5"> </syn-input>

  <syn-input name="item-6" label="Item 6"> </syn-input>
</syn-fieldset>
```
