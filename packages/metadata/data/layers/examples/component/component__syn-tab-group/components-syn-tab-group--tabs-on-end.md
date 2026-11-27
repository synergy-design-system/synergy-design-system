## Tabs On End

Tabs can be shown on the ending side by setting placement to end.

```html
<syn-tab-group placement="end">
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```
