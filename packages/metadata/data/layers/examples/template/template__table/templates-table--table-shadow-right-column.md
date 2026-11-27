## Table Shadow Right Column

If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
property should be set to 'separate'. Otherwise the table will have some strange behaviors.

```html
<div id="horizontal-scrollable-table2">
  <table class="syn-table--default">
    <thead>
      <tr>
        <th class="">Name</th>
        <th class="">Customer</th>
        <th class="">Location</th>
        <th class="">Contract Start</th>
        <th class="syn-table-cell--shadow-start shadow-cell"></th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td class="">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="syn-table-cell--shadow-start shadow-cell buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="syn-table-cell--shadow-start shadow-cell buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="syn-table-cell--shadow-start shadow-cell buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="syn-table-cell--shadow-start shadow-cell buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="syn-table-cell--shadow-start shadow-cell buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<style>
  #horizontal-scrollable-table2 {
    overflow-x: auto;
    width: 550px;
  }

  #horizontal-scrollable-table2 > table {
    /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
    /* border-collapse: separate; */
  }

  #horizontal-scrollable-table2 .shadow-cell {
    position: sticky;
    right: 0;
    z-index: 1;
  }

  #horizontal-scrollable-table2 td {
    min-width: 120px;
  }

  #horizontal-scrollable-table2 .buttons-cell {
    padding-top: var(--syn-spacing-2x-small);
    padding-bottom: var(--syn-spacing-2x-small);
    min-width: 76px;
  }
</style>
<script type="module">
  const scrollableTable = document.getElementById(
    "horizontal-scrollable-table2",
  );
  const shadowCells = scrollableTable.querySelectorAll(
    ".syn-table-cell--shadow-start",
  );
  const maxScrollX = scrollableTable.scrollWidth - scrollableTable.clientWidth;

  const handleShadow = () => {
    shadowCells.forEach((shadowCell) => {
      if (scrollableTable.scrollLeft === maxScrollX) {
        shadowCell.classList.remove("syn-table-cell--shadow-active");
      } else {
        shadowCell.classList.add("syn-table-cell--shadow-active");
      }
    });
  };

  // Initially set shadow on load
  handleShadow();

  scrollableTable.addEventListener("scroll", handleShadow);
</script>
```
