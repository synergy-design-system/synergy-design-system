
## Default

The syn-table-cell component offers basic styling for table cells. A table can be created by combining several cell components into columns and rows. DEV: Instead of a component we have multiple classes, to apply the table styling. More complex tables, such as applying the shadow styling and adding scrolling behavior, require additional CSS and JavaScript Code. See the table templates for examples.

```html
<table class="syn-table">
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

---

## Header

Use the cell header attribute to help the user identify the top of the table. Table header can be used as column header and row Header, but not at the same time.

```html
<table class="syn-table">
  <thead>
    <tr>
      <th class="syn-table-cell--header">Cell header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="syn-table-cell">Cell content</td>
    </tr>
  </tbody>
</table>

```

---

## Alternating

The alternating attribute helps the user to visually separate the rows, even when scrolling horizontally, and helps to compare the data.

```html
<table class="syn-table">
  <tbody>
    <tr>
      <td class="syn-table-cell">Cell content</td>
    </tr>
    <tr>
      <td class="syn-table-cell syn-table-cell--alternating">Cell content</td>
    </tr>
    <tr>
      <td class="syn-table-cell">Cell content</td>
    </tr>
    <tr>
      <td class="syn-table-cell syn-table-cell--alternating">Cell content</td>
    </tr>
  </tbody>
</table>

```

---

## Border

Use the border attribute to define different borders in a cell. Borders can also be combined.

```html
<table class="syn-table">
  <tbody>
    <tr>
      <td class="syn-table-cell syn-table-cell--border-top">Border Top</td>
    </tr>
    <tr>
      <td class="syn-table-cell syn-table-cell--border-start">Border Start</td>
    </tr>
    <tr>
      <td class="syn-table-cell syn-table-cell--border-end">Border End</td>
    </tr>
    <tr>
      <td class="syn-table-cell syn-table-cell--border-bottom">Border Left</td>
    </tr>
  </tbody>
</table>

```

---

## Scrolling Behavior

If the table contains a scrolling behavior the table cell gets a shadow.

```html
<table class="syn-table">
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
