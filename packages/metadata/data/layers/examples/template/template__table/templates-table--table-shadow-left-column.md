## Table Shadow Left Column

If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
property should be set to 'separate'. Otherwise the table will have some strange behaviors.

```html
<div id="horizontal-scrollable-table">
  <table class="syn-table--default">
    <thead>
      <tr>
        <th class="syn-table-cell--shadow-end shadow-cell">Name</th>
        <th class="">Customer</th>
        <th class="">Location</th>
        <th class="">Contract Start</th>
        <th class=""></th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td class="syn-table-cell--shadow-end shadow-cell">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="syn-table-cell--shadow-end shadow-cell">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="syn-table-cell--shadow-end shadow-cell">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="syn-table-cell--shadow-end shadow-cell">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="buttons-cell">
          <syn-button variant="text" size="small">
            <syn-icon name="edit"></syn-icon>
          </syn-button>
          <syn-button variant="text" size="small">
            <syn-icon name="delete_outline"></syn-icon>
          </syn-button>
        </td>
      </tr>

      <tr>
        <td class="syn-table-cell--shadow-end shadow-cell">Max Mustermann</td>
        <td class="">Muster AG</td>
        <td class="">Hamburg, Düsseldorf, Freiburg</td>
        <td class="">20.01.2023</td>
        <td class="buttons-cell">
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
  #horizontal-scrollable-table {
    overflow-x: auto;
    width: 550px;
  }

  #horizontal-scrollable-table > table {
    /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
    /* border-collapse: separate; */
  }

  #horizontal-scrollable-table .shadow-cell {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  #horizontal-scrollable-table td {
    min-width: 120px;
  }

  #horizontal-scrollable-table .buttons-cell {
    padding-top: var(--syn-spacing-2x-small);
    padding-bottom: var(--syn-spacing-2x-small);
    min-width: 76px;
  }
</style>
<script type="module">
  const scrollableTable = document.getElementById(
    "horizontal-scrollable-table",
  );
  const shadowCells = scrollableTable.querySelectorAll(
    ".syn-table-cell--shadow-end",
  );

  scrollableTable.addEventListener("scroll", () => {
    shadowCells.forEach((shadowCell) => {
      if (scrollableTable.scrollLeft === 0) {
        shadowCell.classList.remove("syn-table-cell--shadow-active");
      } else {
        shadowCell.classList.add("syn-table-cell--shadow-active");
      }
    });
  });

  scrollableTable.scrollLeft = 20;
</script>
```
