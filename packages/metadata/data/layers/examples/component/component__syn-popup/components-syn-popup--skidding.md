## Skidding

The skidding attribute is similar to distance,
but instead allows you to offset the popup along the anchor's axis.
Both positive and negative values are allowed.

```html
<div class="popup-skidding">
  <syn-popup placement="top" skidding="0" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-range min="-50" max="50" step="1" value="0" label="Skidding"></syn-range>
</div>

<style>
  .popup-skidding span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-skidding .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-skidding syn-range {
    max-width: 260px;
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-skidding");
  const popup = container.querySelector("syn-popup");
  const skidding = container.querySelector("syn-range");

  skidding.addEventListener(
    "syn-input",
    () => (popup.skidding = skidding.value),
  );
</script>
```
