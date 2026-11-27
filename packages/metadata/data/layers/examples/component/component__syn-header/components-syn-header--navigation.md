## Navigation

Use the top navigation slot to add syn-navigation and horizontal syn-navigation-items.

```html
<syn-header label="App Name">
  <syn-prio-nav slot="navigation">
    <syn-nav-item current="" horizontal="">Domains</syn-nav-item>
    <syn-nav-item horizontal="">Projects</syn-nav-item>
    <syn-nav-item horizontal="">Trainings</syn-nav-item>
    <syn-nav-item horizontal="">Evaluations</syn-nav-item>
    <syn-nav-item horizontal="">Deployments</syn-nav-item>
  </syn-prio-nav>
</syn-header>
<script type="module">
  // This emulates a click on the prio-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  Array.from(document.querySelectorAll("syn-prio-nav")).forEach((nav) => {
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
