# Rules for your results:

There are no other components than the ones that are displayed in the component list.

The following examples show components that do not exist.

```html
<!--
  -- Invalid. There is no syn-datepicker component!
  -- Use a syn-input with type="date" for this!
-->
<syn-datepicker value="2024-01-22" label="Your birthday"></syn-datepicker>

<!--
  -- Invalid! There is no component named syn-table-cell!
  -- The metadata for synergy css is not yet there, so just use <td> for this!
-->
<table>
  <tr>
    <syn-table-cell>Content</syn-table-cell>
  </tr>
</table>
```

Key takeaways:

1. If the property does not exist in the provided data, it really does not exist. Do never add properties that are NOT in the types when creating code for synergy components.
2. Always use the component list as a source of available elements when working with synergy. If a component does not exist in the list, it does NOT exist in Synergy.
