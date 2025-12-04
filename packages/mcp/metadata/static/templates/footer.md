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
    background: var(--syn-page-background);
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
