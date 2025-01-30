export const createLayout = () => `
  <syn-header label="@synergy-design-system/components Components Demo">
    <a
      class="custom-logo"
      href="/"
      routerLink="/"
      slot="logo"
      tabindex="0"
    >
      <syn-icon name="logo-color" library="system" />
    </a>

    <syn-switch
      data-theme-light="☀️"
      data-theme-dark="🌙"
      id="theme-switch"
      slot="meta-navigation"
    >🌙</syn-switch>
  </syn-header>

  <!-- main -->
  <div class="main">

    <!-- side-nav -->
    <syn-side-nav rail>
      <syn-nav-item href="/">
        Home
        <syn-icon name="home" slot="prefix"></syn-icon>
      </syn-nav-item>
      <syn-nav-item divider href="/contact-form">
        Contact Form
        <syn-icon name="contact_mail" slot="prefix"></syn-icon>
      </syn-nav-item>
      <syn-nav-item divider href="/contact-form-validate">
        Contact Form (Validation)
        <syn-icon name="contact_emergency" slot="prefix"></syn-icon>
      </syn-nav-item>
      <syn-nav-item divider href="/all-components">
        All Components
        <syn-icon name="grid_view" slot="prefix"></syn-icon>
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
