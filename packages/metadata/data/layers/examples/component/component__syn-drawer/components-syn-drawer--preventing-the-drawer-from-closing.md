## Preventing The Drawer From Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the Escape key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.To keep the drawer open in such cases, you can cancel the syn-request-close event. When canceled, the drawer will remain open and pulse briefly to draw the user’s attention to it.You can use event.detail.source to determine what triggered the request to close. This example prevents the drawer from closing when the overlay is clicked, but allows the close button or Escape to dismiss it.

```html
<syn-drawer label="Drawer" open="" class="drawer-deny-close">
  This drawer will not close when you click on the overlay.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-deny-close");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());

  // Prevent the drawer from closing when the user clicks on the overlay
  drawer.addEventListener("syn-request-close", (event) => {
    if (event.detail.source === "overlay") {
      event.preventDefault();
    }
  });
</script>
```
