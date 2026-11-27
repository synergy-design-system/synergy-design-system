## Default

Tab groups organize content into a container that shows one section at a time. Tab groups make use of tabs and tab panels. Each tab must be slotted into the nav slot and its panel must refer to a tab panel of the same name.

```html
<syn-tab-group>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <span slot="nav"> </span> <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <span slot="nav"> </span>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <span slot="nav"> </span>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
</syn-tab-group>
```
