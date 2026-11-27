## Distance

Use the distance attribute to change the distance between the popup and its anchor.
A positive value will move the popup further away and a negative value will move it closer.

```html
<div class="popup-distance">
  <syn-popup placement="top" distance="0" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-range min="-50" max="50" step="1" value="0" label="Distance"></syn-range>
</div>

<style>
  .popup-distance span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-distance .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-distance syn-range {
    max-width: 260px;
  }
</style>

<script type="module">
  const container = document.querySelector(".popup-distance");
  const popup = container.querySelector("syn-popup");
  const distance = container.querySelector("syn-range");

  distance.addEventListener(
    "syn-input",
    () => (popup.distance = distance.value),
  );
</script>
```
