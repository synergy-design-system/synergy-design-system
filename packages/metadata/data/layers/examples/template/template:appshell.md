## Side Navigation

The side navigation opens when the user clicks on the burger menu. As the side navigation opens, a transparent mask fades in and the navigation overlaps the content area. To close the navigation, the user must either click on the close icon or anywhere on the content area to the right of the side navigation.

```html
<!-- .synergy-demo-application -->
<div
  class="synergy-demo-application story-loaded-0"
  id="appshell-side-navigation"
>
  <!-- header -->
  <syn-header label="Synergy" burger-menu="closed">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon
          name="settings"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon
          name="logout"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
```

---

## Side Navigation Shrinking Content

The side navigation opens when the user clicks on the burger menu. As the side navigation opens, the content area shrinks. To close the navigation, the user must click on the close icon.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application story-loaded-0" id="appshell-shrink">
  <!-- header -->
  <syn-header label="Synergy" burger-menu="open">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon
          name="settings"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon
          name="logout"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
```

---

## Rail Navigation (Desktop)

The navigation opens when the user hovers over it. As the navigation opens, it overlaps the content area. To close the navigation, the user simply hovers outside of it.

```html
<!-- .synergy-demo-application -->
<div class="synergy-demo-application story-loaded-0" id="appshell-rail-desktop">
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon
          name="settings"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon
          name="logout"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
<div class="synergy-demo-application story-loaded-1" id="appshell-rail-desktop">
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon
          name="settings"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon
          name="logout"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
<div
  class="synergy-demo-application story-loaded-0"
  id="appshell-sticky-desktop"
>
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
<div
  class="synergy-demo-application story-loaded-1"
  id="appshell-sticky-desktop"
>
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
        <syn-icon
          name="home"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="spoke"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="insert_drive_file"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wb_cloudy"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="volunteer_activism"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
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
<div
  class="synergy-demo-application story-loaded-0"
  id="appshell-top-navigation"
>
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- prio-nav -->
    <syn-prio-nav slot="navigation">
      <syn-nav-item current="" horizontal="true">Home</syn-nav-item>
      <syn-nav-item horizontal="true">Documents</syn-nav-item>
      <syn-nav-item horizontal="true">Applications</syn-nav-item>
      <syn-nav-item horizontal="true">Teams</syn-nav-item>
    </syn-prio-nav>
    <!-- /prio-nav -->

    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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
```

---

## Alternative Background

Additionally the top navigation can be combined with an alternative background.

```html
<!-- .synergy-demo-application -->
<div
  class="synergy-demo-application story-loaded-0"
  id="appshell-white-background"
>
  <!-- header -->
  <syn-header label="Synergy" burger-menu="hidden">
    <!-- prio-nav -->
    <syn-prio-nav slot="navigation">
      <syn-nav-item current="" horizontal="true">Home</syn-nav-item>
      <syn-nav-item horizontal="true">Documents</syn-nav-item>
      <syn-nav-item horizontal="true">Applications</syn-nav-item>
      <syn-nav-item horizontal="true">Teams</syn-nav-item>
    </syn-prio-nav>
    <!-- /prio-nav -->

    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
          size="inherit"
        ></syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Menu Item</syn-menu-item
          >
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

<style>
  #appshell-white-background .synergy-demo-content {
    background: var(--syn-panel-background-color);
  }
</style>
```
