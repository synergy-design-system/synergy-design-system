## Header Actions

The header shows a functional close button by default. You can use the header-actions slot to add additional icon buttons if needed.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-header-actions"
>
  <syn-icon-button
    class="new-window"
    slot="header-actions"
    name="open_in_new"
    label="Arrow Up"
  ></syn-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-header-actions");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');
  const newWindowButton = drawer.querySelector(".new-window");

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
  newWindowButton.addEventListener("click", () => window.open(location.href));
</script>
```
