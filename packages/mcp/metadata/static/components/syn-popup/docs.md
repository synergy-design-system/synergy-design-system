## Default

Popup is a utility that lets you declaratively anchor “popup” containers to another element.This component’s name is inspired by <popup>. It uses Floating UI under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.Popup doesn’t provide any styles — just positioning! The popup’s preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking. Additional positioning options are available and described in more detail below.

```html
<div class="popup-default">
  <syn-popup active="" arrow-padding="10" placement="top">
    <div class="box"></div>
    <span slot="anchor"></span>
  </syn-popup>
</div>
<style>
  .popup-default span[slot="anchor"] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--syn-color-neutral-600);
    margin: 50px;
  }

  .popup-default .box {
    width: 100px;
    height: 50px;
    background: var(--syn-color-primary-600);
    border-radius: var(--syn-border-radius-medium);
  }
</style>
```

---

## Activating

Popups are inactive and hidden until the active attribute is applied.
Removing the attribute will tear down all positioning logic and listeners,
meaning you can have many idle popups on the page without affecting performance.

```html
<div class="popup-active">
  <syn-popup placement="top" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <br />
  <syn-switch checked="" title="" size="medium" form="">Active</syn-switch>
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

By default, anchors are slotted into the popup using the anchor slot.
If your anchor needs to live outside of the popup,
you can pass the anchor's id to the anchor attribute.
Alternatively, you can pass an element reference
to the anchor property to achieve the same effect without using an id.

```html
<span id="external-anchor"></span>

<syn-popup anchor="external-anchor" placement="top" active="">
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

  <syn-select
    label="Placement"
    value="top"
    size="medium"
    placement="bottom"
    form=""
  >
    <syn-option
      value="top"
      role="option"
      aria-selected="true"
      aria-disabled="false"
      >top</syn-option
    >
    <syn-option
      value="top-start"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >top-start</syn-option
    >
    <syn-option
      value="top-end"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >top-end</syn-option
    >
    <syn-option
      value="bottom"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >bottom</syn-option
    >
    <syn-option
      value="bottom-start"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >bottom-start</syn-option
    >
    <syn-option
      value="bottom-end"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >bottom-end</syn-option
    >
    <syn-option
      value="right"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >right</syn-option
    >
    <syn-option
      value="right-start"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >right-start</syn-option
    >
    <syn-option
      value="right-end"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >right-end</syn-option
    >
    <syn-option
      value="left"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >left</syn-option
    >
    <syn-option
      value="left-start"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >left-start</syn-option
    >
    <syn-option
      value="left-end"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >left-end</syn-option
    >
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

Use the distance attribute to change the distance between the popup and its anchor.
A positive value will move the popup further away and a negative value will move it closer.

```html
<div class="popup-distance">
  <syn-popup placement="top" distance="0" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-range
    min="-50"
    max="50"
    step="1"
    value="0"
    label="Distance"
    size="medium"
    form=""
  ></syn-range>
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

The skidding attribute is similar to distance,
but instead allows you to offset the popup along the anchor's axis.
Both positive and negative values are allowed.

```html
<div class="popup-skidding">
  <syn-popup placement="top" skidding="0" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-range
    min="-50"
    max="50"
    step="1"
    value="0"
    label="Skidding"
    size="medium"
    form=""
  ></syn-range>
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
      size="medium"
      placement="bottom"
      form=""
    >
      <syn-option
        value="top"
        role="option"
        aria-selected="true"
        aria-disabled="false"
        >top</syn-option
      >
      <syn-option
        value="top-start"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >top-start</syn-option
      >
      <syn-option
        value="top-end"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >top-end</syn-option
      >
      <syn-option
        value="bottom"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >bottom</syn-option
      >
      <syn-option
        value="bottom-start"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >bottom-start</syn-option
      >
      <syn-option
        value="bottom-end"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >bottom-end</syn-option
      >
      <syn-option
        value="right"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >right</syn-option
      >
      <syn-option
        value="right-start"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >right-start</syn-option
      >
      <syn-option
        value="right-end"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >right-end</syn-option
      >
      <syn-option
        value="left"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >left</syn-option
      >
      <syn-option
        value="left-start"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >left-start</syn-option
      >
      <syn-option
        value="left-end"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >left-end</syn-option
      >
    </syn-select>

    <syn-select
      label="Arrow Placement"
      name="arrow-placement"
      value="anchor"
      size="medium"
      placement="bottom"
      form=""
    >
      <syn-option
        value="anchor"
        role="option"
        aria-selected="true"
        aria-disabled="false"
        >anchor</syn-option
      >
      <syn-option
        value="start"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >start</syn-option
      >
      <syn-option
        value="end"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >end</syn-option
      >
      <syn-option
        value="center"
        role="option"
        aria-selected="false"
        aria-disabled="false"
        >center</syn-option
      >
    </syn-select>
  </div>

  <div class="popup-arrow-options">
    <syn-switch name="arrow" checked="" title="" size="medium" form=""
      >Arrow</syn-switch
    >
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

Use the sync attribute to make the popup the same width or height as the anchor element.
This is useful for controls that need the popup to stay the same width or height as the trigger.

```html
<div class="popup-sync">
  <syn-popup placement="top" sync="width" active="">
    <span slot="anchor"></span>
    <div class="box"></div>
  </syn-popup>

  <syn-select
    value="width"
    label="Sync"
    size="medium"
    placement="bottom"
    form=""
  >
    <syn-option
      value="width"
      role="option"
      aria-selected="true"
      aria-disabled="false"
      >Width</syn-option
    >
    <syn-option
      value="height"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Height</syn-option
    >
    <syn-option
      value="both"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Both</syn-option
    >
    <syn-option
      value=""
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >None</syn-option
    >
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
  <syn-switch checked="" title="" size="medium" form="">Flip</syn-switch>
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

While using the flip attribute, you can customize the placement
of the popup when the preferred placement doesn't have room.
For this, use flip-fallback-placements and flip-fallback-strategy.
If the preferred placement doesn't have room,
the first suitable placement found in flip-fallback-placement will be used.
The value of this attribute must be a string,
including any number of placements separated by a space, e.g. "right bottom".
If no fallback placement works, the final placement will be determined by flip-fallback-strategy.
This value can be either initial (default),
where the placement reverts to the position in placement,
or best-fit, where the placement is chosen based on available space.
Scroll the container to see how the popup changes it's fallback placement to prevent clipping.

```html
<div class="popup-flip-fallbacks">
  <div class="overflow">
    <syn-popup
      placement="top"
      flip=""
      flip-fallback-placements="right bottom"
      flip-fallback-strategy="initial"
      active=""
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

  <syn-switch checked="" title="" size="medium" form="">Shift</syn-switch>
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

## Virtual Elements

In most cases, popups are anchored to an actual element.
Sometimes, it can be useful to anchor them to a non-element.
To do this, you can pass a VirtualElement to the anchor property.
A virtual element must contain a function called getBoundingClientRect() that returns
a object as shown below.
This example anchors a popup to the mouse cursor using a virtual element.
As such, a mouse is required to properly view it.

```html
<div class="popup-virtual-element">
  <syn-popup placement="right-start">
    <div class="circle"></div>
  </syn-popup>

  <syn-switch title="" size="medium" form="">Highlight mouse cursor</syn-switch>
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
