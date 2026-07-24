## Default

Dropdowns expose additional content that “drops down” in a panel.Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.Dropdowns are designed to work well with menus to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications (e.g. color picker). The API gives you complete control over showing, hiding, and positioning the panel.

```html
<div style="position: relative">
  <syn-dropdown>
    <syn-button slot="trigger" caret="">Dropdown</syn-button>
    <syn-menu style="min-width: 240px">
      <syn-menu-item>Dropdown Item 1</syn-menu-item>
      <syn-menu-item>Dropdown Item 2</syn-menu-item>
      <syn-menu-item>Dropdown Item 3</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item type="checkbox" checked="">Checkbox</syn-menu-item>
      <syn-menu-item disabled="">Disabled</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item>
        Prefix
        <syn-icon slot="prefix" name="wallpaper"></syn-icon>
      </syn-menu-item>
      <syn-menu-item>
        Suffix Icon
        <syn-icon slot="suffix" name="wallpaper"></syn-icon>
      </syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

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

---

## Placement

The preferred placement of the dropdown can be set with the placement attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html
<div style="position: relative">
  <syn-dropdown placement="right-start">
    <syn-button slot="trigger" caret="">Edit</syn-button>
    <syn-menu style="min-width: 240px">
      <syn-menu-item>Cut</syn-menu-item>
      <syn-menu-item>Copy</syn-menu-item>
      <syn-menu-item>Paste</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item>Find</syn-menu-item>
      <syn-menu-item>Replace</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Distance

The distance from the panel to the trigger can be customized using the distance attribute. This value is specified in pixels.

```html
<div style="position: relative">
  <syn-dropdown distance="30">
    <syn-button slot="trigger" caret="">Edit</syn-button>
    <syn-menu style="min-width: 240px">
      <syn-menu-item>Cut</syn-menu-item>
      <syn-menu-item>Copy</syn-menu-item>
      <syn-menu-item>Paste</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item>Find</syn-menu-item>
      <syn-menu-item>Replace</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Skidding

The offset of the panel along the trigger can be customized using the skidding attribute. This value is specified in pixels.

```html
<div style="position: relative">
  <syn-dropdown skidding="30">
    <syn-button slot="trigger" caret="">Edit</syn-button>
    <syn-menu style="min-width: 240px">
      <syn-menu-item>Cut</syn-menu-item>
      <syn-menu-item>Copy</syn-menu-item>
      <syn-menu-item>Paste</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item>Find</syn-menu-item>
      <syn-menu-item>Replace</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Submenus

To create a submenu, nest an <syn-menu slot="submenu"> element in a menu item.

```html
<div style="position: relative">
  <syn-dropdown>
    <syn-button slot="trigger" caret="">Edit</syn-button>

    <syn-menu style="min-width: 240px">
      <syn-menu-item value="undo">Undo</syn-menu-item>
      <syn-menu-item value="redo">Redo</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item value="cut">Cut</syn-menu-item>
      <syn-menu-item value="copy">Copy</syn-menu-item>
      <syn-menu-item value="paste">Paste</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item>
        Find
        <syn-menu slot="submenu">
          <syn-menu-item value="find">Find…</syn-menu-item>
          <syn-menu-item value="find-previous">Find Next</syn-menu-item>
          <syn-menu-item value="find-next">Find Previous</syn-menu-item>
        </syn-menu>
      </syn-menu-item>
      <syn-menu-item>
        Transformations
        <syn-menu slot="submenu">
          <syn-menu-item value="uppercase">Make uppercase</syn-menu-item>
          <syn-menu-item value="lowercase">Make lowercase</syn-menu-item>
          <syn-menu-item value="capitalize">Capitalize</syn-menu-item>
        </syn-menu>
      </syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```
