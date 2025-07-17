
## Default

Tab panels are used inside tab groups to display tabbed content.

```html
<syn-tab-group>
  <syn-tab
    slot="nav"
    panel="tab1"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-13"
    tabindex="0"
    >Tab Item</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="tab2"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-14"
    tabindex="0"
    >Tab Item</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="tab3"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-15"
    tabindex="0"
    >Tab Item</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="tab4"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-16"
    tabindex="0"
    >Tab Item</syn-tab
  >

  <syn-tab-panel
    name="tab1"
    id="syn-tab-panel-16"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab2"
    id="syn-tab-panel-13"
    role="tabpanel"
    aria-hidden="true"
    ><main class="synergy-replace">Replace this slot</main></syn-tab-panel
  >
  <syn-tab-panel
    name="tab3"
    id="syn-tab-panel-14"
    role="tabpanel"
    aria-hidden="true"
    ><main class="synergy-replace">Replace this slot</main></syn-tab-panel
  >
  <syn-tab-panel
    name="tab4"
    id="syn-tab-panel-15"
    role="tabpanel"
    aria-hidden="true"
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
