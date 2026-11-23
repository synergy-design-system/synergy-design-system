## Flip

When the popup doesn't have enough room in its preferred placement,
it can automatically flip to keep it in view.
To enable this, use the flip attribute.
By default, the popup will flip to the opposite placement, but you can configure
preferred fallback placements using flip-fallback-placement and flip-fallback-strategy.
Additional options are available to control the flip behavior's boundary and padding.

```html
<div class="popup-flip">
  <div class="overflow">
    <syn-popup placement="top" flip="" active="" id="popup-flip">
      <span slot="anchor"></span>
      <div class="box"></div>
    </syn-popup>
  </div>

  <br />
  <syn-switch checked="">Flip</syn-switch>
</div>

<style>
  .popup-flip .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--syn-color-neutral-200);
    overflow: auto;
  }

  .popup-flip span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 150px 50px;
  }

  .popup-flip .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-flip");
  const popup = container.querySelector("#popup-flip");
  const flip = container.querySelector(".popup-flip syn-switch");

  flip.addEventListener("syn-change", () => (popup.flip = flip.checked));
</script>
```
