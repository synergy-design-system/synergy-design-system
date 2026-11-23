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
