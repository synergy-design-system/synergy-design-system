## Default

Popup is a utility that lets you declaratively anchor “popup” containers to another element.This component’s name is inspired by <popup>. It uses Floating UI under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.Popup doesn’t provide any styles — just positioning! The popup’s preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking. Additional positioning options are available and described in more detail below.

```html
<div class="popup-default">
  <syn-popup active="true">
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
