## Visual Hierarchy

To structure the Page, you can use different tab styles.

```html
<h3 class="body-medium">Default</h3>
<syn-tab-group>
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Contained</h3>
<syn-tab-group contained="">
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Sharp</h3>
<syn-tab-group contained="" sharp="">
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
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

  .body-medium:first-of-type {
    margin-top: 0;
  }

  .body-medium {
    font: var(--syn-body-medium-bold);
    color: var(--syn-color-neutral-1000);
    margin-top: var(--syn-spacing-2x-large);
    margin-bottom: var(--syn-spacing-large);
  }
</style>
```
