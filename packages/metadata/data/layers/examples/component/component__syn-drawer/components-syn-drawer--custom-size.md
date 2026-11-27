## Custom Size

Use the --size custom property to set the drawer’s size. This will be applied to the drawer’s width or height depending on its placement.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-custom-size"
  style="--size: 50vw"
>
  This drawer is always 50% of the viewport.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-custom-size");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
