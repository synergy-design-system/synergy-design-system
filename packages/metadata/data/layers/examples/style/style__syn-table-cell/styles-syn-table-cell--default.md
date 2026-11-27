## Default

The syn-table-cell component offers basic styling for table cells. A table can be created by combining several cell components into columns and rows. DEV: Instead of a component we have multiple classes, to apply the table styling. More complex tables, such as applying the shadow styling and adding scrolling behavior, require additional CSS and JavaScript Code. See the table templates for examples.

```html
<table class="syn-table" style="width: 200px">
  <tbody>
    <tr>
      <td class="syn-table-cell sticky">Cell content</td>
    </tr>
  </tbody>
</table>
<style>
  .sticky {
    position: sticky;
  }
</style>
```
