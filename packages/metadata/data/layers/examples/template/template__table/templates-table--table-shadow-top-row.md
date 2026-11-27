## Table Shadow Top Row

If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
property should be set to 'separate'. Otherwise the table will have some strange behaviors.

```html
<div id="vertical-scrollable-table">
  <table class="syn-table--default">
    <thead>
      <tr>
        <th class="syn-table-cell--shadow-bottom shadow-cell">Name</th>
        <th class="syn-table-cell--shadow-bottom shadow-cell">Customer</th>
        <th class="syn-table-cell--shadow-bottom shadow-cell">Location</th>
        <th class="syn-table-cell--shadow-bottom shadow-cell">
          Contract Start
        </th>
        <th class="syn-table-cell--shadow-bottom shadow-cell"></th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td class="">Max Mustermann</td>
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
        <td class="">Max Mustermann</td>
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
        <td class="">Max Mustermann</td>
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
        <td class="">Max Mustermann</td>
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
        <td class="">Max Mustermann</td>
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
  #vertical-scrollable-table {
    overflow-y: auto;
    height: 200px;
    width: fit-content;
  }

  #vertical-scrollable-table > table {
    /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
    /* border-collapse: separate; */
  }

  #vertical-scrollable-table .shadow-cell {
    position: sticky;
    z-index: 1;
    top: 0;
  }

  #vertical-scrollable-table .buttons-cell {
    padding-top: var(--syn-spacing-2x-small);
    padding-bottom: var(--syn-spacing-2x-small);
    min-width: 76px;
  }
</style>
<script type="module">
  const scrollableTable = document.getElementById("vertical-scrollable-table");
  const shadowCells = scrollableTable.querySelectorAll(
    ".syn-table-cell--shadow-bottom",
  );

  scrollableTable.addEventListener("scroll", () => {
    shadowCells.forEach((shadowCell) => {
      if (scrollableTable.scrollTop === 0) {
        shadowCell.classList.remove("syn-table-cell--shadow-active");
      } else {
        shadowCell.classList.add("syn-table-cell--shadow-active");
      }
    });
  });

  scrollableTable.scrollTop = 20;
</script>
```
