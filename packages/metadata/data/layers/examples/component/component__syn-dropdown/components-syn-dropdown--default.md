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
