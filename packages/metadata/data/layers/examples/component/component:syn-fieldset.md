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
