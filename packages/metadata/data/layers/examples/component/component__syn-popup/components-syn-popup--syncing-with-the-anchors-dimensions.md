## Syncing With The Anchors Dimensions

Use the sync attribute to make the popup the same width or height as the anchor element.
This is useful for controls that need the popup to stay the same width or height as the trigger.

```html
<div class="popup-sync">
  <syn-popup placement="top" sync="width" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-select value="width" label="Sync">
    <syn-option value="width">Width</syn-option>
    <syn-option value="height">Height</syn-option>
    <syn-option value="both">Both</syn-option>
    <syn-option value="">None</syn-option>
  </syn-select>
</div>

<style>
  .popup-sync span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-sync .box {
    width: 100%;
    height: 100%;
    min-width: 50px;
    min-height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-sync syn-select {
    width: 160px;
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-sync");
  const popup = container.querySelector("syn-popup");
  const fixed = container.querySelector("syn-switch");
  const sync = container.querySelector("syn-select");

  sync.addEventListener("syn-change", () => (popup.sync = sync.value));
</script>
```
