## Footer

The Side navigation can have an optional bottom navigation "slot" to split up the navigation entries.Please avoid having to many navigation entries (at the bottom) as it can massively influence the user experience.

```html
<syn-header class="header-footer" label="Side Navigation"></syn-header>
<main class="main-footer">
  <syn-side-nav class="side-nav-footer" open="">
    <syn-nav-item current="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>

    <syn-nav-item slot="footer">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Footer Item
    </syn-nav-item>
    <syn-nav-item divider="" slot="footer">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Footer Item
    </syn-nav-item>
  </syn-side-nav>
</main>
<script type="module">
  // Only needed to have correct behavior in our documentation "Docs" page
  const header =
    document.querySelector("#storybook-docs .header-footer") ||
    document.querySelector(".header-footer");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-footer") ||
    document.querySelector(".side-nav-footer");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-footer")).forEach((nav) => {
    nav.addEventListener("click", (e) => {
      const target = e.target.closest("syn-nav-item");

      if (!target) {
        return;
      }

      // Update the current indicator
      nav.querySelectorAll("syn-nav-item").forEach((item) => {
        item.removeAttribute("current");
        if (item === target) {
          item.setAttribute("current", "");
        }
      });
    });
  });
</script>

<style>
  .main-footer {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }
</style>
```
