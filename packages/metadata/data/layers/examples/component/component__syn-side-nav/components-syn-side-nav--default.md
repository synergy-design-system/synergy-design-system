## Default

Side navigation lets the user navigate through the entire content of a product. It supports single or nested navigation levels.

```html
<syn-header label="Side Navigation"></syn-header>
<main
  style="
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  "
  class="side-nav-default"
>
  <syn-side-nav open="true">
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
</main>
<script type="module">
  const mainContents = document.querySelectorAll(".side-nav-default");

  Array.from(mainContents).forEach((mainContent, index) => {
    const selector = "story-loaded-".concat(index);
    if (!mainContent.classList.contains(selector)) {
      const header = mainContent.previousElementSibling;
      const sideNav = mainContent.querySelector("syn-side-nav");
      header.connectSideNavigation(sideNav);
      mainContent.classList.add(selector);
    }
  });
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll(".side-nav-default")).forEach((nav) => {
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
```
