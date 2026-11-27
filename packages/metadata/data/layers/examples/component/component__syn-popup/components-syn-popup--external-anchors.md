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
