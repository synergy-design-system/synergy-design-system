## Dynamically Set Localizations

This example shows how to dynamically set localizations for Synergy components. This can be useful if you want to allow users to change the language of your application on the fly.

```html
<!-- .synergy-demo-application -->
<div id="localization-demo-story" class="synergy-demo-application">
  <!-- header -->
  <syn-header label="Localization Demo" sticky="" burger-menu="hidden">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown placement="bottom-start">
        <div slot="trigger">
          <syn-tooltip content="Change language" placement="bottom">
            <syn-icon-button
              color="neutral"
              name="language"
              label="Choose language"
              size="inherit"
            ></syn-icon-button>
          </syn-tooltip>
        </div>
        <syn-menu role="menu">
          <syn-menu-item
            type="checkbox"
            value="cs"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="0"
            >Čeština</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="da"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Dansk</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            checked=""
            value="de"
            role="menuitemcheckbox"
            aria-checked="true"
            aria-disabled="false"
            tabindex="-1"
            >Deutsch</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="en"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >English</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="es"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Español</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="fi"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Suomi</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="fr"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Français</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="it"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Italian</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="ja"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >日本語</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="ko"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >한국어</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="nl"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Nederlands</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="pl"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Polski</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="pt-BR"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Português (Brazil)</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="ru"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Русский</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="sv"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Svenska</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="tr"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >Türkçe</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="zh-cn"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >简体中文</syn-menu-item
          >

          <syn-menu-item
            type="checkbox"
            value="zh-tw"
            role="menuitemcheckbox"
            aria-checked="false"
            aria-disabled="false"
            tabindex="-1"
            >正體中文</syn-menu-item
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
      <syn-card shadow="">
        <h1 class="syn-heading--3x-large">
          Current selected language:
          <span>Deutsch</span>
        </h1>
        <p>
          The following example demonstrates the usage of the
          <code>&lt;syn-file&gt;</code> component with different language
          settings. The first item will adapt to the currently selected
          language, while the second one uses a fixed
          <code>lang="en"</code> attribute, making it fixed to English
          regardless of the selected language.
        </p>
        <p>
          Try changing the language using the dropdown in the header to see how
          the first file input updates its translations accordingly.
        </p>
        <div class="form">
          <syn-file droparea="" size="medium" form=""></syn-file>
          <syn-file droparea="" lang="en" size="medium" form=""></syn-file>
        </div>
      </syn-card>
    </main>
    <!-- /.synergy-demo-main -->
  </div>
  <!-- /.synergy-demo-content -->
</div>
<!-- /.synergy-demo-application -->

<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  .synergy-demo-application {
    display: flex;
    flex-direction: column;
  }

  .synergy-demo-content {
    background: var(--syn-page-background-color-muted);
  }

  .synergy-demo-main {
    display: flex;
    flex-direction: column;
    font: var(--syn-body-medium);
    margin: var(--syn-spacing-medium);

    h1 {
      margin: 0 0 var(--syn-spacing-medium);
    }

    .form {
      display: flex;
      flex-direction: row;
      gap: var(--syn-spacing-medium);

      syn-file {
        flex-basis: calc(50% - var(--syn-spacing-medium) / 2);
      }
    }
  }
</style>
```
