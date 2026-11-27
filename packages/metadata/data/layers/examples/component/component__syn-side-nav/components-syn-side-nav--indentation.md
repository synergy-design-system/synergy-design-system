## Indentation

The different levels of navigation can be organized using the indention. The current status of a page shows the user directly which page they are browsing.

```html
<syn-header class="header-indentation" label="Side Navigation"></syn-header>
<main class="main-indentation">
  <syn-side-nav class="side-nav-indentation" open="">
    <syn-nav-item open="">
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
      <!-- second-level -->
      <syn-nav-item slot="children" open="">
        <syn-icon name="wallpaper" slot="prefix"></syn-icon>
        Navigation Item
        <!-- third-level -->
        <syn-nav-item slot="children" current="">
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Navigation Item
        </syn-nav-item>
        <!-- /third-level -->
      </syn-nav-item>
      <!-- /second-level -->
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
</main>
<script type="module">
  // Only needed to have correct behavior in our documentation "Docs" page
  const header =
    document.querySelector("#storybook-docs .header-indentation") ||
    document.querySelector(".header-indentation");
  const sideNav =
    document.querySelector("#storybook-docs .side-nav-indentation") ||
    document.querySelector(".side-nav-indentation");
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-indentation")).forEach(
    (nav) => {
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
    },
  );
</script>

<style>
  .main-indentation {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }
</style>
```
