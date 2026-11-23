## Arrows

Add an arrow to your popup with the arrow attribute.
It's usually a good idea to set a distance to make room for the arrow.
To adjust the arrow's color and size,
use the --arrow-color and --arrow-size custom properties, respectively.
You can also target the arrow part to add additional styles such as shadows and borders.
By default, the arrow will be aligned as close to
the center as possible, considering available space and arrow-padding.
You can use the arrow-placement attribute to force
the arrow to align to the start, end, or center of the instead.

```html
<div class="popup-arrow">
  <syn-popup
    placement="top"
    arrow=""
    arrow-placement="anchor"
    distance="8"
    active=""
  >
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <div class="popup-arrow-options">
    <syn-select
      label="Placement"
      name="placement"
      value="top"
      class="popup-overview-select"
    >
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

    <syn-select label="Arrow Placement" name="arrow-placement" value="anchor">
      <syn-option value="anchor">anchor</syn-option>
      <syn-option value="start">start</syn-option>
      <syn-option value="end">end</syn-option>
      <syn-option value="center">center</syn-option>
    </syn-select>
  </div>

  <div class="popup-arrow-options">
    <syn-switch name="arrow" checked="">Arrow</syn-switch>
  </div>

  <style>
    .popup-arrow syn-popup {
      --arrow-color: var(--syn-color-primary-600);
    }

    .popup-arrow span[slot="anchor"] {
      display: inline-block;
      width: 150px;
      height: 150px;
      border: dashed 2px var(--syn-color-neutral-600);
      margin: 50px;
    }

    .popup-arrow .box {
      width: 100px;
      height: 50px;
      background: var(--syn-color-primary-600);
      border-radius: var(--syn-border-radius-medium);
    }

    .popup-arrow-options {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 1rem;
    }

    .popup-arrow-options syn-select {
      width: 160px;
    }

    .popup-arrow-options + .popup-arrow-options {
      margin-top: 1rem;
    }
  </style>

  <script type="module">
    const container = document.querySelector(".popup-arrow");
    const popup = container.querySelector("syn-popup");
    const placement = container.querySelector('[name="placement"]');
    const arrowPlacement = container.querySelector('[name="arrow-placement"]');
    const arrow = container.querySelector('[name="arrow"]');

    placement.addEventListener(
      "syn-change",
      () => (popup.placement = placement.value),
    );
    arrowPlacement.addEventListener(
      "syn-change",
      () => (popup.arrowPlacement = arrowPlacement.value),
    );
    arrow.addEventListener("syn-change", () => (popup.arrow = arrow.checked));
  </script>
</div>
```
