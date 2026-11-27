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
