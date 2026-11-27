## Default

It is possible to achieve different table stylings (default, with border, alternating, ...)
either via multiple classes on the table, td and th elements or as a convenient alternative
as auto styling class, which is applied on a table element. These auto styling classes will
style the td and th elements correctly, without the need to apply further classes.
Note: The auto styling table classes work for simple table layouts. For more complex ones or advanced use cases, the table cell classes should be used.

```html
<table class="syn-table--default">
  <thead>
    <tr>
      <th>Header content</th>
      <th>Header content</th>
      <th>Header content</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell content</td>
      <td>Cell content</td>
      <td>Cell content</td>
    </tr>
    <tr>
      <td>Cell content</td>
      <td>Cell content</td>
      <td>Cell content</td>
    </tr>
    <tr>
      <td>Cell content</td>
      <td>Cell content</td>
      <td>Cell content</td>
    </tr>
    <tr>
      <td>Cell content</td>
      <td>Cell content</td>
      <td>Cell content</td>
    </tr>
  </tbody>
</table>
```
