## Checkbox Menu Items

Set the type attribute to checkbox to create a menu item that will toggle on and off when selected. You can use the checked attribute to set the initial state.Checkbox menu items are visually indistinguishable from regular menu items. Their ability to be toggled is primarily inferred from context, much like you’d find in the menu of a native app.

```html
<syn-menu style="max-width: 240px">
  <syn-menu-item type="checkbox">Autosave</syn-menu-item>
  <syn-menu-item type="checkbox" checked="">Check Spelling</syn-menu-item>
  <syn-menu-item type="checkbox">Word Wrap</syn-menu-item>
</syn-menu>
```
