## Slide In From Top

To make the drawer slide in from the top, set the placement attribute to top.

```html
<syn-drawer label="Drawer" open="" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-top");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
