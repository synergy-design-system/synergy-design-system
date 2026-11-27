## Fixed

Per default, the side navigation shows an overlay. This should always be the case, if the content of the app is not shrinking. This makes especially sense for applications, where you navigate to a place and stay there for a longer time.

```html
<div class="container-fixed">
  <syn-header class="header-fixed" label="Side Navigation"></syn-header>
  <main class="main-fixed">
    <syn-side-nav class="side-nav-fixed" open="">
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
    <div class="content-fixed">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </div>
  </main>
</div>
<script type="module">
  // Only needed to have correct behavior in our documentation "Docs" page
  const header =
    document.querySelector("#storybook-docs .header-fixed") ||
    document.querySelector(".header-fixed");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-fixed") ||
    document.querySelector(".side-nav-fixed");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-fixed")).forEach((nav) => {
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
  .container-fixed {
    display: flex;
    flex-direction: column;
  }

  .main-fixed {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }

  .content-fixed {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
  }
</style>
```
