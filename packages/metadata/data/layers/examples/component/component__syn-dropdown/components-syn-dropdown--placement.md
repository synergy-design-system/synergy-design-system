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
