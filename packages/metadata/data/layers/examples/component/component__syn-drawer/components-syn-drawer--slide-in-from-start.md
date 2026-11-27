## Slide In From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the placement attribute to start.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-placement-start"
>
  This drawer slides in from the start.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-start");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
