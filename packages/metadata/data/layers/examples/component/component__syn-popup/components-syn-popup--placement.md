## Placement

Use the placement attribute to tell the popup the preferred placement of the popup.
Note that the actual position will vary to ensure the panel remains in the viewport
if you're using positioning features such as flip and shift.
Since placement is preferred when using flip, you can observe the popup's current placement
when it's active by looking at the data-current-placement attribute.
This attribute will update as the popup flips to find
available space and it will be removed when the popup is deactivated.

```html
<div class="popup-placement">
  <syn-popup placement="top" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-select label="Placement" value="top">
    <syn-option value="top">top</syn-option>
    <syn-option value="top-start">top-start</syn-option>
    <syn-option value="top-end">top-end</syn-option>
    <syn-option value="bottom">bottom</syn-option>
    <syn-option value="bottom-start">bottom-start</syn-option>
    <syn-option value="bottom-end">bottom-end</syn-option>
    <syn-option value="right">right</syn-option>
    <syn-option value="right-start">right-start</syn-option>
    <syn-option value="right-end">right-end</syn-option>
    <syn-option value="left">left</syn-option>
    <syn-option value="left-start">left-start</syn-option>
    <syn-option value="left-end">left-end</syn-option>
  </syn-select>
</div>

<style>
  .popup-placement span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-placement .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-placement syn-select {
    max-width: 280px;
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-placement");
  const popup = container.querySelector("syn-popup");
  const select = container.querySelector("syn-select");

  select.addEventListener("syn-change", () => (popup.placement = select.value));
</script>
```
