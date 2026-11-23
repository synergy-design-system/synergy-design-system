## Scrolling Behavior

If the table contains a scrolling behavior the table cell gets a shadow.

```html
<table class="syn-table" style="width: 400px">
  <thead>
    <tr>
      <th
        class="syn-table-cell--header syn-table-cell--shadow-bottom syn-table-cell--shadow-active sticky"
      >
        Cell header
      </th>
      <th
        class="syn-table-cell--header syn-table-cell--shadow-bottom syn-table-cell--shadow-active sticky"
      >
        Cell header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="syn-table-cell">Cell content</td>
      <td class="syn-table-cell">Cell content</td>
    </tr>
  </tbody>
</table>
<style>
  .sticky {
    position: sticky;
  }
</style>
```
