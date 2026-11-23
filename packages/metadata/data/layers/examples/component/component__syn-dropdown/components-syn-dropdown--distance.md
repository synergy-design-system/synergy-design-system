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
