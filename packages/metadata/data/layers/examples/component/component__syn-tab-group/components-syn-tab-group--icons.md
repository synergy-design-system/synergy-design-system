## Icons

It is also possible to a Add icon to the Tabs.

```html
<syn-tab-group>
  <syn-tab slot="nav" panel="general" active="">
    <syn-icon name="style"></syn-icon>
    General
  </syn-tab>
  <syn-tab slot="nav" panel="custom">
    <syn-icon name="tune"></syn-icon>
    Custom
  </syn-tab>
  <syn-tab slot="nav" panel="advanced">
    <syn-icon name="verified_user"></syn-icon>
    Advanced
  </syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">
    <syn-icon name="update_disabled"></syn-icon>
    Disabled
  </syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```
