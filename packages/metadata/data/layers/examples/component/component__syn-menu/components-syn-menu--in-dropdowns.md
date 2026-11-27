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
