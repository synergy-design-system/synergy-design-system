## Default

Tab panels are used inside tab groups to display tabbed content.

```html
<syn-tab-group>
  <syn-tab slot="nav" panel="tab1">Tab Item</syn-tab>
  <syn-tab slot="nav" panel="tab2">Tab Item</syn-tab>
  <syn-tab slot="nav" panel="tab3">Tab Item</syn-tab>
  <syn-tab slot="nav" panel="tab4">Tab Item</syn-tab>

  <syn-tab-panel name="tab1">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab2"
    ><main class="synergy-replace">Replace this slot</main></syn-tab-panel
  >
  <syn-tab-panel name="tab3"
    ><main class="synergy-replace">Replace this slot</main></syn-tab-panel
  >
  <syn-tab-panel name="tab4"
    ><main class="synergy-replace">Replace this slot</main></syn-tab-panel
  >
</syn-tab-group>
<style>
  .synergy-replace {
    border: 1px dashed #9747ff;
    border-radius: var(--syn-border-radius-small);
    color: #9747ff;
    font: var(--syn-body-small-bold);
    height: var(--syn-spacing-x-large);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```
