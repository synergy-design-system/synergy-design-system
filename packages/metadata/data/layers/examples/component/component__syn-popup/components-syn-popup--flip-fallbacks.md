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
