## Shrink

For specific cases it might make sense to have the navigation open while still being able to interact with the app. This especially makes sense for cases where you switch a lot between areas to interact with an app.You can decide yourself depending on your app and screen size, when it makes sense to omit the overlay and shrink the content.This should never be used in combination with a Rail navigation, as this would lead to too much friction on hover.

```html
<syn-header class="header-shrink" label="Side Navigation"></syn-header>
<main class="main-shrink">
  <syn-side-nav open="" class="side-nav-shrink" no-focus-trapping="">
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
  <div class="content-shrink">
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
    document.querySelector("#storybook-docs .header-shrink") ||
    document.querySelector(".header-shrink");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-shrink") ||
    document.querySelector(".side-nav-shrink");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-shrink")).forEach((nav) => {
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
  .main-shrink {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .side-nav-shrink::part(overlay) {
    display: none;
  }

  .content-shrink {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>
```
