## Slide In From Bottom

To make the drawer slide in from the bottom, set the placement attribute to bottom.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="bottom"
  class="drawer-placement-bottom"
>
  This drawer slides in from the bottom.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-bottom");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
