## Default

Menus provide a list of options for the user to choose from.You can use menu items, menu labels, and dividers to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html
<div style="width: 200px">
  <syn-menu>
    <syn-menu-item value="undo">Undo</syn-menu-item>
    <syn-menu-item value="redo">Redo</syn-menu-item>
    <syn-divider></syn-divider>
    <syn-menu-item value="cut">Cut</syn-menu-item>
    <syn-menu-item value="copy">Copy</syn-menu-item>
    <syn-menu-item value="paste">Paste</syn-menu-item>
    <syn-menu-item value="delete">Delete</syn-menu-item>
  </syn-menu>
</div>
```

---

## In Dropdowns

Menus work really well when used inside dropdowns.

```html
<div style="position: relative">
  <syn-dropdown placement="bottom-start" open="">
    <syn-button slot="trigger" caret="">Edit</syn-button>
    <syn-menu style="width: 200px">
      <syn-menu-item value="cut">Cut</syn-menu-item>
      <syn-menu-item value="copy">Copy</syn-menu-item>
      <syn-menu-item value="paste">Paste</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Submenus

To create a submenu, nest an <syn-menu slot="submenu"> in any menu item.

```html
<syn-menu style="max-width: 200px">
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
</syn-menu>
```
