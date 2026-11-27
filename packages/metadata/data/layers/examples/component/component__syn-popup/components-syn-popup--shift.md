## Shift

When a popup is longer than its anchor, it risks being clipped by an overflowing container.
In this case, use the shift attribute to shift the popup along its axis and back into view.
You can customize the shift behavior using shiftBoundary and shift-padding.
Toggle the switch to see the difference.

```html
<div class="popup-shift">
  <div class="overflow">
    <syn-popup placement="top" shift="" shift-padding="10" active="">
      <span slot="anchor"></span>
      <div class="box"></div>
    </syn-popup>
  </div>

  <syn-switch checked="">Shift</syn-switch>
</div>

<style>
  .popup-shift .overflow {
    position: relative;
    border: solid 2px var(--syn-color-neutral-200);
    overflow: auto;
  }

  .popup-shift span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 60px 0 0 10px;
  }

  .popup-shift .box {
    width: 300px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-shift");
  const popup = container.querySelector("syn-popup");
  const shift = container.querySelector("syn-switch");

  shift.addEventListener("syn-change", () => (popup.shift = shift.checked));
</script>
```
