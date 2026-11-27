## Prefix And Suffix

Add content to the start and end of menu items using the prefix and suffix slots.

```html
<syn-menu style="max-width: 240px">
  <syn-menu-item>
    <syn-icon slot="prefix" name="house"></syn-icon>
    Home
  </syn-menu-item>

  <syn-menu-item>
    <syn-icon slot="prefix" name="mail"></syn-icon>
    Messages
    <syn-icon slot="suffix" name="info"></syn-icon>
  </syn-menu-item>

  <syn-divider></syn-divider>

  <syn-menu-item>
    <syn-icon slot="prefix" name="settings"></syn-icon>
    Settings
  </syn-menu-item>
</syn-menu>
```
