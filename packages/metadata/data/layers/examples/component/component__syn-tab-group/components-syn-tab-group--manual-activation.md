## Manual Activation

When focused, keyboard users can press Left or Right to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting activation="manual" which will require the user to press Space or Enter before showing the tab panel (manual activation).

```html
<syn-tab-group activation="manual">
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
