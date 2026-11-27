## Contained To An Element

By default, drawers slide out of their containing block, which is usually the viewport. To make a drawer slide out of a parent element, add the contained attribute to the drawer and apply position: relative to its parent.Unlike normal drawers, contained drawers are not modal. This means they do not show an overlay, they do not trap focus, and they are not dismissible with Escape. This is intentional to allow users to interact with elements outside of the drawer.

```html
<div
  style="
    position: relative;
    border: solid 2px var(--syn-panel-border-color);
    height: 300px;
    padding: 1rem;
    margin-bottom: 1rem;
  "
>
  The drawer will be contained to this box. This content won't shift or be
  affected in any way when the drawer opens.

  <syn-drawer
    label="Drawer"
    open=""
    contained=""
    class="drawer-contained"
    style="--size: 50%"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button slot="footer" variant="filled">Close</syn-button>
  </syn-drawer>
</div>

<syn-button>Toggle Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-contained");
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => (drawer.open = !drawer.open));
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
