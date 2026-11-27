## Rail

Set the variant attribute to rail to only show a small navigation stripe at the left side using only the prefix-icons of the navigation items. This will open on hover on the rail navigation, therefore the header doesn't have an burger-menu-icon.On touch devices the navigation opens on click and shows an overlay to be closable.Note: The Rail is only an option if all Navigation Items on the first level have an Icon. If this is not the case you should use a burger navigation.

```html
<syn-header class="header-rail" label="Side Navigation"></syn-header>
<main class="main-rail">
  <syn-side-nav class="side-nav-rail" variant="rail">
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
  </syn-side-nav>
  <div class="content-rail">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</main>
<script type="module">
  // Only needed to have correct behavior in our documentation "Docs" page
  const header =
    document.querySelector("#storybook-docs .header-rail") ||
    document.querySelector(".header-rail");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-rail") ||
    document.querySelector(".side-nav-rail");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-rail")).forEach((nav) => {
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
  .main-rail {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .content-rail {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>
```
