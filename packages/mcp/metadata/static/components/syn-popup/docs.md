## Default

Popup is a utility that lets you declaratively anchor “popup” containers to another element.This component’s name is inspired by . It uses Floating UI under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.Popup doesn’t provide any styles — just positioning! The popup’s preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking. Additional positioning options are available and described in more detail below.

```html
<syn-popup arrow-padding="10" placement="top" strategy="absolute"></syn-popup>
```

---

## Activating

Popups are inactive and hidden until the active attribute is applied. Removing the attribute will tear down all positioning logic and listeners, meaning you can have many idle popups on the page without affecting performance.

```html
<div class="popup-active">
  <syn-popup placement="top" active="" strategy="absolute">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <br />
  <syn-switch checked="">Active</syn-switch>
</div>

<style>
  .popup-active span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-active .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>
```

---

## External Anchors

By default, anchors are slotted into the popup using the anchor slot. If your anchor needs to live outside of the popup, you can pass the anchor's id to the anchor attribute. Alternatively, you can pass an element reference to the anchor property to achieve the same effect without using an id.

```html
<span id="external-anchor"></span>

<syn-popup
  anchor="external-anchor"
  placement="top"
  active=""
  strategy="absolute"
>
  <div class="box"></div>
</syn-popup>

<style>
  #external-anchor {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px 0 0 50px;
  }

  #external-anchor ~ syn-popup .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>
```

---

## Placement

Use the placement attribute to tell the popup the preferred placement of the popup. Note that the actual position will vary to ensure the panel remains in the viewport if you're using positioning features such as flip and shift.Since placement is preferred when using flip, you can observe the popup's current placement when it's active by looking at the data-current-placement attribute. This attribute will update as the popup flips to find available space and it will be removed when the popup is deactivated.

```html
<div class="popup-placement">
  <syn-popup placement="top" active="" strategy="absolute">
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
```

---

## Distance

Use the distance attribute to change the distance between the popup and its anchor. A positive value will move the popup further away and a negative value will move it closer.

```html
<div class="popup-distance">
  <syn-popup placement="top" distance="0" active="" strategy="absolute">
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
```

---

## Skidding

The skidding attribute is similar to distance, but instead allows you to offset the popup along the anchor's axis. Both positive and negative values are allowed.

```html
<div class="popup-skidding">
  <syn-popup placement="top" skidding="0" active="" strategy="absolute">
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
```

---

## Arrows

Add an arrow to your popup with the arrow attribute. It's usually a good idea to set a distance to make room for the arrow. To adjust the arrow's color and size, use the --arrow-color and --arrow-size custom properties, respectively. You can also target the arrow part to add additional styles such as shadows and borders.By default, the arrow will be aligned as close to the center of the as possible, considering available space and arrow-padding. You can use the arrow-placement attribute to force the arrow to align to the start, end, or center of the instead.

```html
<div class="popup-arrow">
  <syn-popup
    placement="top"
    arrow=""
    arrow-placement="anchor"
    distance="8"
    active=""
    strategy="absolute"
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
</div>
```

---

## Syncing With The Anchors Dimensions

Use the sync attribute to make the popup the same width or height as the anchor element. This is useful for controls that need the popup to stay the same width or height as the trigger.

```html
<div class="popup-sync">
  <syn-popup placement="top" sync="width" active="" strategy="absolute">
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
```

---

## Positioning Strategy

By default, the popup is positioned using an absolute positioning strategy. However, if your anchor is fixed or exists within a container that has overflow: auto|hidden, the popup risks being clipped. To work around this, you can use a fixed positioning strategy by setting the strategy attribute to fixed.The fixed positioning strategy reduces jumpiness when the anchor is fixed and allows the popup to break out containers that clip. When using this strategy, it's important to note that the content will be positioned relative to its , which is usually the viewport unless an ancestor uses a transform, perspective, or filter. for more details.In this example, you can see how the popup breaks out of the overflow container when it's fixed. The fixed positioning strategy tends to be less performant than absolute, so avoid using it unnecessarily.Toggle the switch and scroll the container to see the difference.

```html
<div class="popup-strategy">
  <div class="overflow">
    <syn-popup placement="top" strategy="fixed" active="">
      <span slot="anchor"></span>
      <div class="box"></div>
    </syn-popup>
  </div>

  <syn-switch checked="">Fixed</syn-switch>
</div>

<style>
  .popup-strategy .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--syn-color-neutral-200);
    overflow: auto;
  }

  .popup-strategy span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 150px 50px;
  }

  .popup-strategy .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-strategy syn-switch {
    margin-top: 1rem;
  }
</style>
```

---

## Flip

When the popup doesn't have enough room in its preferred placement, it can automatically flip to keep it in view. To enable this, use the flip attribute. By default, the popup will flip to the opposite placement, but you can configure preferred fallback placements using flip-fallback-placement and flip-fallback-strategy. Additional options are available to control the flip behavior's boundary and padding.Scroll the container to see how the popup flips to prevent clipping.

```html
<div class="popup-flip">
  <div class="overflow">
    <syn-popup placement="top" flip="" active="" strategy="absolute">
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
```

---

## Flip Fallbacks

While using the flip attribute, you can customize the placement of the popup when the preferred placement doesn't have room. For this, use flip-fallback-placements and flip-fallback-strategy.If the preferred placement doesn't have room, the first suitable placement found in flip-fallback-placement will be used. The value of this attribute must be a string including any number of placements separated by a space, e.g. "right bottom".If no fallback placement works, the final placement will be determined by flip-fallback-strategy. This value can be either initial (default), where the placement reverts to the position in placement, or best-fit, where the placement is chosen based on available space.Scroll the container to see how the popup changes it's fallback placement to prevent clipping.

```html
<div class="popup-flip-fallbacks">
  <div class="overflow">
    <syn-popup
      placement="top"
      flip=""
      flip-fallback-placements="right bottom"
      flip-fallback-strategy="initial"
      active=""
      strategy="absolute"
    >
      <span slot="anchor"></span>
      <div class="box"></div>
    </syn-popup>
  </div>
</div>

<style>
  .popup-flip-fallbacks .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--syn-color-neutral-200);
    overflow: auto;
  }

  .popup-flip-fallbacks span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 250px 50px;
  }

  .popup-flip-fallbacks .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>
```

---

## Shift

When a popup is longer than its anchor, it risks being clipped by an overflowing container. In this case, use the shift attribute to shift the popup along its axis and back into view. You can customize the shift behavior using shiftBoundary and shift-padding.Toggle the switch to see the difference.

```html
<div class="popup-shift">
  <div class="overflow">
    <syn-popup
      placement="top"
      shift=""
      shift-padding="10"
      active=""
      strategy="absolute"
    >
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
```

---

## Autosize

Use the auto-size attribute to tell the popup to resize when necessary to prevent it from getting clipped. Possible values are horizontal, vertical, and both. You can use autoSizeBoundary and auto-size-padding to customize the behavior of this option. Auto-size works well with flip, but if you're using auto-size-padding make sure flip-padding is the same value.When using auto-size, one or both of --auto-size-available-width and --auto-size-available-height will be applied to the host element. These values determine the available space the popover has before clipping will occur. Since they cascade, you can use them to set a max-width/height on your popup's content and easily control its overflow.Scroll the container to see the popup resize as its available space changes.

```html
<div class="popup-auto-size">
  <div class="overflow">
    <syn-popup
      placement="top"
      auto-size="both"
      auto-size-padding="10"
      active=""
      strategy="absolute"
      style="
        --auto-size-available-height: 748px;
        --auto-size-available-width: 372px;
      "
    >
      <span slot="anchor"></span>
      <div class="box"></div>
    </syn-popup>
  </div>

  <br />
  <syn-switch checked="">Auto-size</syn-switch>
</div>

<style>
  .popup-auto-size .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--syn-color-neutral-200);
    overflow: auto;
  }

  .popup-auto-size span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 250px 50px 100px 50px;
  }

  .popup-auto-size .box {
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);

    /* This sets the preferred size of the popup's content */
    width: 100px;
    height: 200px;

    /* This sets the maximum dimensions and allows scrolling when auto-size kicks in */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
    overflow: auto;
  }
</style>
```

---

## Hover Bridge

When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the gap using an invisible element. This makes listening for events such as mouseover and mouseout more sane because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is active. For demonstration purposes, the bridge in this example is shown in orange.

```html
<div class="popup-hover-bridge">
  <syn-popup
    placement="top"
    hover-bridge=""
    distance="10"
    skidding="0"
    active=""
    strategy="absolute"
    style="
      --hover-bridge-top-left-x: 144px;
      --hover-bridge-top-left-y: 14817.46875px;
      --hover-bridge-top-right-x: 244px;
      --hover-bridge-top-right-y: 14817.46875px;
      --hover-bridge-bottom-left-x: 117px;
      --hover-bridge-bottom-left-y: 14827.46875px;
      --hover-bridge-bottom-right-x: 271px;
      --hover-bridge-bottom-right-y: 14827.46875px;
    "
  >
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <br />
  <syn-switch checked="">Hover Bridge</syn-switch><br />
  <syn-range min="0" max="50" step="1" value="10" label="Distance"></syn-range>
  <syn-range min="-50" max="50" step="1" value="0" label="Skidding"></syn-range>
</div>

<style>
  .popup-hover-bridge span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-hover-bridge .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }

  .popup-hover-bridge syn-range {
    max-width: 260px;
    margin-top: 0.5rem;
  }

  .popup-hover-bridge syn-popup::part(hover-bridge) {
    background: tomato;
    opacity: 0.5;
  }
</style>
```

---

## Virtual Elements

In most cases, popups are anchored to an actual element. Sometimes, it can be useful to anchor them to a non-element. To do this, you can pass a VirtualElement to the anchor property. A virtual element must contain a function called getBoundingClientRect() that returns a object as shown below.This example anchors a popup to the mouse cursor using a virtual element. As such, a mouse is required to properly view it.

```html
<div class="popup-virtual-element">
  <syn-popup placement="right-start" strategy="absolute">
    <div class="circle"></div>
  </syn-popup>

  <syn-switch>Highlight mouse cursor</syn-switch>
</div>

<style>
  /* If you need to set a z-index, set it on the popup part like this */
  .popup-virtual-element syn-popup::part(popup) {
    z-index: 1000;
    pointer-events: none;
  }

  .popup-virtual-element .circle {
    width: 100px;
    height: 100px;
    border: solid 4px var(--syn-color-primary-600);
    border-radius: 50%;
    translate: -50px -50px;
    animation: 1s virtual-cursor infinite;
  }

  @keyframes virtual-cursor {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.1;
    }
  }
</style>
```
