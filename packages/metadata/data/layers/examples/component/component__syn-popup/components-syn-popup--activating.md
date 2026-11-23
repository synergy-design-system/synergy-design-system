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

<script type="module">
  const container = document.querySelector(".popup-active");
  const popup = container.querySelector("syn-popup");
  const active = container.querySelector("syn-switch");

  active.addEventListener("syn-change", () => (popup.active = active.checked));
</script>
```
