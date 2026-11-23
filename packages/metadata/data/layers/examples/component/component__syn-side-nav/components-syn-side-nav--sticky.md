## Sticky

Use the sticky variant when you need a persistent, toggleable side navigation that alternates between a compact “rail” (icon‐only) state and a full‐width state. Note: This pattern is only possible for flat navigation structures (no nesting) where every first‐level item has an icon.

```html
<syn-header class="header-sticky" label="Side Navigation"></syn-header>
<main class="main-sticky">
  <syn-side-nav class="side-nav-sticky" variant="sticky">
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
  <div class="content-sticky">
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
    document.querySelector("#storybook-docs .header-sticky") ||
    document.querySelector(".header-sticky");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-sticky") ||
    document.querySelector(".side-nav-sticky");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-sticky")).forEach((nav) => {
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
  .main-sticky {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .content-sticky {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>
```
