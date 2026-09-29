export const createLayout = () => `
  <syn-header label="Platform Contract Fixtures">
    <a
      aria-label="Back to homepage"
      class="custom-logo"
      href="/"
      routerLink="/"
      slot="logo"
      tabindex="0"
    >
      <syn-icon name="logo-color" library="system" />
    </a>

  </syn-header>

  <!-- main -->
  <div class="main">

    <!-- side-nav -->
    <syn-side-nav variant="rail">
      <syn-nav-item href="/">
        Home
        <syn-icon name="home" slot="prefix"></syn-icon>
      </syn-nav-item>
      <syn-nav-item divider href="/overlay-contracts">
        Overlay Contracts
        <syn-icon name="troubleshoot" slot="prefix"></syn-icon>
      </syn-nav-item>
    </syn-side-nav>
    <!-- /side-nav -->

    <!-- main.content -->
    <main class="content">
      <!-- For markup see pages in src/pages directory -->

      <div class="router-page" data-active="true" data-route="/">
        <syn-spinner size="large"></syn-spinner>
      </div>

    </main>
    <!-- /main.content -->
  </div>
  <!-- /main -->
`;
