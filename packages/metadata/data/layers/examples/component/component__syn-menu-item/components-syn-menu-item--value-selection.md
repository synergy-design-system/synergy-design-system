## Value Selection

The value attribute can be used to assign a hidden value, such as a unique identifier, to a menu item. When an item is selected, the syn-select event will be emitted and a reference to the item will be available at event.detail.item. You can use this reference to access the selected item’s value, its checked state, and more.

```html
<syn-menu class="menu-value" style="max-width: 200px">
  <syn-menu-item value="opt-1">Option 1</syn-menu-item>
  <syn-menu-item value="opt-2">Option 2</syn-menu-item>
  <syn-menu-item value="opt-3">Option 3</syn-menu-item>
  <syn-divider></syn-divider>
  <syn-menu-item type="checkbox" value="opt-4" checked=""
    >Checkbox 4</syn-menu-item
  >
  <syn-menu-item type="checkbox" value="opt-5">Checkbox 5</syn-menu-item>
  <syn-menu-item type="checkbox" value="opt-6">Checkbox 6</syn-menu-item>
</syn-menu>

<script type="module">
  const menu = document.querySelector(".menu-value");

  menu.addEventListener("syn-select", (event) => {
    const item = event.detail.item;

    // Log value
    if (item.type === "checkbox") {
      console.log(
        "Selected value: ",
        item.value,
        item.checked ? "checked" : "unchecked",
      );
    } else {
      console.log("Selected value: ", item.value);
    }
  });
</script>
```
