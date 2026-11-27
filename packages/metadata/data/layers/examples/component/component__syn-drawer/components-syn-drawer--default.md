## Default

Drawers slide in from a container to expose additional options and information.

```html
<syn-drawer open="true" label="Drawer">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <span slot="footer"> </span>
  <syn-button class="close-icon" slot="footer" variant="filled"
    >Close</syn-button
  >
  <span slot="footer"> </span>
  <script slot="footer">
    document.querySelector(".close-icon").addEventListener("click", (e) => {
      e.target.closest("syn-drawer").hide();
    });
  </script>
  <span slot="footer"> </span>
</syn-drawer>

<syn-button class="drawer-default-story-opener">Open Drawer</syn-button>
<script type="module">
  const openButtons = document.querySelectorAll(".drawer-default-story-opener");

  // Make sure to add each event only once!
  Array.from(openButtons).forEach((btn) => {
    if (!btn.classList.contains("story-loaded")) {
      const drawer = btn.parentElement.querySelector("syn-drawer");
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      btn.addEventListener("click", () => drawer.show());
      closeButton.addEventListener("click", () => drawer.hide());

      btn.classList.add("story-loaded");
    }
  });
</script>
```
