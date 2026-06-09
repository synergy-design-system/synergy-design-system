## Side Navigation

The side navigation opens when the user clicks on the burger menu. As the side navigation opens, a transparent mask fades in and the navigation overlaps the content area. To close the navigation, the user must either click on the close icon or anywhere on the content area to the right of the side navigation.

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
```

---

## Side Navigation Shrinking Content

The side navigation opens when the user clicks on the burger menu. As the side navigation opens, the content area shrinks. To close the navigation, the user must click on the close icon.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-shrink">
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
    <syn-side-nav no-focus-trapping="" open="" variant="default">
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

    <div class="synergy-demo-content-inner">
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

<style>
  #appshell-shrink {
    /**
     * Set this variable to the wanted size of the side-nav
     * Make sure the value stays in sync, otherwise the parts may overlap
     */
    --appshell-shrink-nav-open-width: 320px;

    syn-side-nav::part(overlay) {
      display: none;
    }

    .synergy-demo-content-inner {
      /**
       * Set the initial margin left. Needed because we
       * create the page with the side-bar open
       */
      margin-left: var(--appshell-shrink-nav-open-width);
    }

    /**
     * Show a transition effect for users that do not have reduced motion enabled
     */
    @media (prefers-reduced-motion: no-preference) {
      .synergy-demo-content-inner {
        transition: margin-left 250ms;
      }
    }
  }
</style>

<script type="module">
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-shrink");

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

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-shrink");
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
  // This script will make sure the margin of the content area
  // is adjusted when the side-bar is opened or closed.
  // Make sure to use the same value as in the css variable above
  const sideNav = document
    .getElementById("appshell-shrink")
    .querySelector("syn-side-nav");
  const demoContent = document
    .getElementById("appshell-shrink")
    .querySelector(".synergy-demo-content-inner");
  sideNav.addEventListener("syn-show", () => {
    demoContent.style.marginLeft = "var(--appshell-shrink-nav-open-width)";
  });
  sideNav.addEventListener("syn-hide", () => {
    demoContent.style.marginLeft = "0px";
  });
</script>
```

---

## Rail Navigation (Desktop)

The navigation opens when the user hovers over it. As the navigation opens, it overlaps the content area. To close the navigation, the user simply hovers outside of it.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-rail-desktop">
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
    <syn-side-nav variant="rail">
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

    <div class="synergy-demo-content-inner">
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
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-rail-desktop");

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

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-rail-desktop");
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

<style>
  #appshell-rail-desktop .synergy-demo-content {
    flex-direction: row;
  }

  @media (max-width: 420px) {
    #appshell-rail-desktop syn-side-nav {
      --side-nav-open-width: 306px;
    }
  }
</style>
```

---

## ↳ Tablet

The navigation opens when the user touches it. As the side navigation opens, a transparent mask fades in and the navigation overlaps the content area. To close the navigation, the user must touch anywhere on the content area to the right of the side navigation.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-rail-desktop">
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
    <syn-side-nav variant="rail">
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

    <div class="synergy-demo-content-inner">
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
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-rail-desktop");

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

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-rail-desktop");
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

<style>
  #appshell-rail-desktop .synergy-demo-content {
    flex-direction: row;
  }

  @media (max-width: 420px) {
    #appshell-rail-desktop syn-side-nav {
      --side-nav-open-width: 306px;
    }
  }
</style>
```

---

## Sticky Navigation (Desktop)

General BehaviourThe navigation maintains its compact width until the user clicks the “show sidebar” icon at the bottom. When the navigation expands, it shifts the content area. To reduce the navigation's width, the user simply clicks “Hide sidebar” again.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-sticky-desktop">
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
    <syn-side-nav variant="sticky">
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
    </syn-side-nav>
    <!-- /side-navigation -->

    <div class="synergy-demo-content-inner">
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
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-sticky-desktop");

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

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-sticky-desktop");
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

<style>
  #appshell-sticky-desktop .synergy-demo-content {
    flex-direction: row;
  }

  @media (max-width: 420px) {
    #appshell-sticky-desktop syn-side-nav {
      --side-nav-open-width: 306px;
    }
  }
</style>
```

---

## ↳ Tablet

General BehaviourThe navigation maintains its compact width until the user clicks the “show sidebar” icon at the bottom. When the navigation expands, it shifts the content area. To reduce the navigation's width, the user simply clicks “Hide sidebar” again.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-sticky-desktop">
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
    <syn-side-nav variant="sticky">
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
    </syn-side-nav>
    <!-- /side-navigation -->

    <div class="synergy-demo-content-inner">
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
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const applications = document.querySelectorAll("#appshell-sticky-desktop");

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

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById("appshell-sticky-desktop");
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

<style>
  #appshell-sticky-desktop .synergy-demo-content {
    flex-direction: row;
  }

  @media (max-width: 420px) {
    #appshell-sticky-desktop syn-side-nav {
      --side-nav-open-width: 306px;
    }
  }
</style>
```

---

## Top Navigation

The top navigation can be combined with a light grey background.This variant is suitable, for example, in combination with cards to achieve a dashboard look and feel.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-top-navigation">
  <!-- header -->
  <syn-header label="Synergy">
    <!-- prio-nav -->
    <syn-prio-nav slot="navigation">
      <syn-nav-item current="" horizontal="">Home</syn-nav-item>
      <syn-nav-item horizontal="">Documents</syn-nav-item>
      <syn-nav-item horizontal="">Applications</syn-nav-item>
      <syn-nav-item horizontal="">Teams</syn-nav-item>
    </syn-prio-nav>
    <!-- /prio-nav -->

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
  const elm = document.getElementById("appshell-top-navigation");
  const nav = elm.querySelector("syn-prio-nav");
  const mainContent = elm.querySelector("main");
  const headline = mainContent.querySelector("h1");

  // Hide the header in case we are using the top navigation
  if ("syn-prio-nav" === "syn-prio-nav") {
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
  const applications = document.querySelectorAll("#appshell-top-navigation");

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

---

## Alternative Background

Additionally the top navigation can be combined with an alternative background.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application" id="appshell-white-background">
  <!-- header -->
  <syn-header label="Synergy">
    <!-- prio-nav -->
    <syn-prio-nav slot="navigation">
      <syn-nav-item current="" horizontal="">Home</syn-nav-item>
      <syn-nav-item horizontal="">Documents</syn-nav-item>
      <syn-nav-item horizontal="">Applications</syn-nav-item>
      <syn-nav-item horizontal="">Teams</syn-nav-item>
    </syn-prio-nav>
    <!-- /prio-nav -->

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
  const elm = document.getElementById("appshell-white-background");
  const nav = elm.querySelector("syn-prio-nav");
  const mainContent = elm.querySelector("main");
  const headline = mainContent.querySelector("h1");

  // Hide the header in case we are using the top navigation
  if ("syn-prio-nav" === "syn-prio-nav") {
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
  const applications = document.querySelectorAll("#appshell-white-background");

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

<style>
  #appshell-white-background .synergy-demo-content {
    background: var(--syn-panel-background-color);
  }
</style>
```
