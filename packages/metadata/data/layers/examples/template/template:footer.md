## Footer

```html
<!-- footer -->
<style>
  .synergy-footer-demo {
    container-type: inline-size;
  }

  .footer-content {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-x-large);
    justify-content: space-between;
    padding: var(--syn-spacing-large) var(--syn-spacing-2x-large);
  }

  .copyright {
    font: var(--syn-body-small-bold);
    margin: 0;
  }

  @container (max-width: 640px) {
    .syn-link-list {
      flex-direction: column;
    }

    .footer-content {
      align-items: flex-start;
      flex-direction: column;
      padding: var(--syn-spacing-large) var(--syn-spacing-medium);
    }
  }
</style>
<footer class="synergy-footer-demo">
  <nav class="footer-content" aria-label="Footer navigation">
    <ul class="syn-link-list syn-link-list--small syn-link-list--horizontal">
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/imprint"
        >
          Imprint
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/tac"
        >
          Terms and conditions
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/terms-of-use"
        >
          Terms of use
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/dataprotection"
        >
          Privacy Policy
        </a>
      </li>
    </ul>
    <p class="copyright">© 2025 SICK AG</p>
  </nav>
</footer>
<!-- /footer -->
```

---

## Footer Within Appshell

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-side-navigation">
  <!-- header -->
  <syn-header label="Synergy">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown>
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
        ></syn-icon-button>
        <syn-menu>
          <syn-menu-item>Menu Item</syn-menu-item>
          <syn-menu-item>Menu Item</syn-menu-item>
          <syn-menu-item>Menu Item</syn-menu-item>
          <syn-menu-item>Menu Item</syn-menu-item>
          <syn-menu-item>Menu Item</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </nav>
    <!-- /meta-navigation -->
  </syn-header>
  <!-- /header -->

  <!-- .synergy-demo-content -->
  <div class="synergy-demo-content">
    <!-- side-navigation -->
    <syn-side-nav variant="default">
      <syn-nav-item current="">
        <syn-icon name="home" slot="prefix"></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="spoke" slot="prefix"></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="insert_drive_file" slot="prefix"></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="wb_cloudy" slot="prefix"></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="volunteer_activism" slot="prefix"></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon name="logout" slot="prefix"></syn-icon>
        Logout
      </syn-nav-item>
    </syn-side-nav>
    <!-- /side-navigation -->

    <main class="synergy-demo-main">
      <h1>Start Page Content</h1>
      Replace this slot
    </main>

    <!-- footer -->
    <style>
      .synergy-footer-demo {
        container-type: inline-size;
      }

      .footer-content {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: var(--syn-spacing-x-large);
        justify-content: space-between;
        padding: var(--syn-spacing-large) var(--syn-spacing-2x-large);
      }

      .copyright {
        font: var(--syn-body-small-bold);
        margin: 0;
      }

      @container (max-width: 640px) {
        .syn-link-list {
          flex-direction: column;
        }

        .footer-content {
          align-items: flex-start;
          flex-direction: column;
          padding: var(--syn-spacing-large) var(--syn-spacing-medium);
        }
      }
    </style>
    <footer class="synergy-footer-demo">
      <nav class="footer-content" aria-label="Footer navigation">
        <ul
          class="syn-link-list syn-link-list--small syn-link-list--horizontal"
        >
          <li>
            <a
              class="syn-link syn-link--small syn-link--quiet"
              href="https://www.sick.com/imprint"
            >
              Imprint
            </a>
          </li>
          <li>
            <a
              class="syn-link syn-link--small syn-link--quiet"
              href="https://www.sick.com/tac"
            >
              Terms and conditions
            </a>
          </li>
          <li>
            <a
              class="syn-link syn-link--small syn-link--quiet"
              href="https://www.sick.com/terms-of-use"
            >
              Terms of use
            </a>
          </li>
          <li>
            <a
              class="syn-link syn-link--small syn-link--quiet"
              href="https://www.sick.com/dataprotection"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
        <p class="copyright">© 2025 SICK AG</p>
      </nav>
    </footer>
    <!-- /footer -->
  </div>
  <!-- /.synergy-demo-content -->
</div>
<!-- /.synergy-demo-application -->

<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  #storybook-root,
  #root-inner {
    height: 100%;
  }

  .synergy-demo-application {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 550px;
  }

  .synergy-demo-content {
    background: var(--syn-page-background-color-muted);
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    height: 1%;
    position: relative;
  }

  .synergy-demo-content-inner {
    container-type: inline-size;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .synergy-demo-main {
    align-items: center;
    border: 1px dashed #9747ff;
    border-radius: var(--syn-border-radius-medium);
    color: #9747ff;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    font: var(--syn-body-small-bold);
    justify-content: center;
    margin: var(--syn-spacing-2x-large) var(--syn-spacing-2x-large) 0;
    padding: 0 var(--syn-spacing-small);
  }

  @container (max-width: 640px) {
    .synergy-demo-main {
      margin: var(--syn-spacing-medium) var(--syn-spacing-medium) 0;
    }
  }

  .synergy-demo-main h1 {
    color: var(--syn-typography-color-text);
    font: var(--syn-heading-large);
    margin: 0;
    text-align: center;
  }
</style>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-side-navigation");
  const nav = elm.querySelector("syn-side-nav");
  const mainContent = elm.querySelector("main");
  const headline = mainContent.querySelector("h1");

  // Hide the header in case we are using the top navigation
  if ("syn-side-nav" === "syn-prio-nav") {
    const header = elm.querySelector("syn-header");
    header.showBurgerMenu = false;
  }

  /**
   * This function will handle the click events on all syn-nav-items
   */
  const navItemClickEvent = (e) => {
    const target = e.target.closest("syn-nav-item");
    if (!target) {
      return;
    }

    // Update the main page headline to reflect the change
    const navItemText = target.innerText.trim();
    headline.innerText = navItemText + " Page Content";

    // Update the current indicator
    nav.querySelectorAll("syn-nav-item").forEach((item) => {
      item.removeAttribute("current");
      if (item === target) {
        item.setAttribute("current", "");
      }
    });
  };

  // Add the listener to the given navigation
  nav.addEventListener("click", navItemClickEvent);
</script>

<script type="module">
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-side-navigation");

  Array.from(applications).forEach((application, index) => {
    const selector = "story-loaded-".concat(index);
    if (!application.classList.contains(selector)) {
      const header = application.querySelector("syn-header");
      const sideNav = application.querySelector("syn-side-nav");
      if (sideNav && header) {
        header.connectSideNavigation(sideNav);
      } else if (!sideNav && header) {
        header.burgerMenu = "hidden";
      }
      application.classList.add(selector);
    }
  });
</script>
```
