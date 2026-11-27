## Getting The Selected Item

When dropdowns are used with menus, you can listen for the syn-select event to determine which menu item was selected. The menu item element will be exposed in event.detail.item. You can set value props to make it easier to identify commands. DEV: Alternatively, you can listen for the click event on individual menu items. Note that, using this approach, disabled menu items will still emit a click event.

```html
<div style="position: relative">
  <div class="dropdown-selection">
    <syn-dropdown>
      <syn-button slot="trigger" caret="">Edit</syn-button>
      <syn-menu style="min-width: 240px">
        <syn-menu-item value="cut">Cut</syn-menu-item>
        <syn-menu-item value="copy">Copy</syn-menu-item>
        <syn-menu-item value="paste">Paste</syn-menu-item>
      </syn-menu>
    </syn-dropdown>
  </div>
</div>

<script type="module">
  const container = document.querySelector(".dropdown-selection");
  const dropdown = container.querySelector("syn-dropdown");

  dropdown.addEventListener("syn-select", (event) => {
    const selectedItem = event.detail.item;
    console.log(selectedItem.value);
  });
</script>
```
