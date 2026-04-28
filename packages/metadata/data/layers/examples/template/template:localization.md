## Dynamically Set Localizations

This example shows how to dynamically set localizations for Synergy components. This can be useful if you want to allow users to change the language of your application on the fly.

```html
<!-- .synergy-demo-application -->
<div id="localization-demo-story" class="synergy-demo-application">
  <!-- header -->
  <syn-header label="Localization Demo" sticky="">
    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown>
        <div slot="trigger">
          <syn-tooltip content="Change language" placement="bottom">
            <syn-icon-button
              color="neutral"
              name="language"
              label="Choose language"
            ></syn-icon-button>
          </syn-tooltip>
        </div>
        <syn-menu>
          <syn-menu-item type="checkbox" value="cs">Čeština</syn-menu-item>

          <syn-menu-item type="checkbox" value="da">Dansk</syn-menu-item>

          <syn-menu-item type="checkbox" checked="" value="de"
            >Deutsch</syn-menu-item
          >

          <syn-menu-item type="checkbox" value="en">English</syn-menu-item>

          <syn-menu-item type="checkbox" value="es">Español</syn-menu-item>

          <syn-menu-item type="checkbox" value="fi">Suomi</syn-menu-item>

          <syn-menu-item type="checkbox" value="fr">Français</syn-menu-item>

          <syn-menu-item type="checkbox" value="it">Italian</syn-menu-item>

          <syn-menu-item type="checkbox" value="ja">日本語</syn-menu-item>

          <syn-menu-item type="checkbox" value="ko">한국어</syn-menu-item>

          <syn-menu-item type="checkbox" value="nl">Nederlands</syn-menu-item>

          <syn-menu-item type="checkbox" value="pl">Polski</syn-menu-item>

          <syn-menu-item type="checkbox" value="pt-BR"
            >Português (Brasil)</syn-menu-item
          >

          <syn-menu-item type="checkbox" value="ru">Русский</syn-menu-item>

          <syn-menu-item type="checkbox" value="sv">Svenska</syn-menu-item>

          <syn-menu-item type="checkbox" value="tr">Türkçe</syn-menu-item>

          <syn-menu-item type="checkbox" value="zh-cn">简体中文</syn-menu-item>

          <syn-menu-item type="checkbox" value="zh-tw">正體中文</syn-menu-item>
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
          <span data-current-language="">Deutsch</span>
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
          <syn-file droparea=""></syn-file>
          <syn-file droparea="" lang="en"></syn-file>
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

<script type="module">
  const localizations = [
    {
      code: "cs",
      dir: "ltr",
      name: "Čeština",
    },
    {
      code: "da",
      dir: "ltr",
      name: "Dansk",
    },
    {
      code: "de",
      dir: "ltr",
      name: "Deutsch",
    },
    {
      code: "en",
      dir: "ltr",
      name: "English",
    },
    {
      code: "es",
      dir: "ltr",
      name: "Español",
    },
    {
      code: "fi",
      dir: "ltr",
      name: "Suomi",
    },
    {
      code: "fr",
      dir: "ltr",
      name: "Français",
    },
    {
      code: "it",
      dir: "ltr",
      name: "Italian",
    },
    {
      code: "ja",
      dir: "ltr",
      name: "日本語",
    },
    {
      code: "ko",
      dir: "ltr",
      name: "한국어",
    },
    {
      code: "nl",
      dir: "ltr",
      name: "Nederlands",
    },
    {
      code: "pl",
      dir: "ltr",
      name: "Polski",
    },
    {
      code: "pt-BR",
      dir: "ltr",
      name: "Português (Brasil)",
    },
    {
      code: "ru",
      dir: "ltr",
      name: "Русский",
    },
    {
      code: "sv",
      dir: "ltr",
      name: "Svenska",
    },
    {
      code: "tr",
      dir: "ltr",
      name: "Türkçe",
    },
    {
      code: "zh-cn",
      dir: "ltr",
      name: "简体中文",
    },
    {
      code: "zh-tw",
      dir: "ltr",
      name: "正體中文",
    },
  ];
  const root = document.querySelector("#localization-demo-story");
  const menu = root?.querySelector("#localization-demo-story syn-menu");
  const languageLabel = root?.querySelector("[data-current-language]");

  if (menu && languageLabel) {
    const applyLocale = (localeCode) => {
      const locale = localizations.find(({ code }) => code === localeCode);
      if (!locale) {
        return;
      }

      document.documentElement.setAttribute("lang", locale.code);
      document.documentElement.setAttribute("dir", locale.dir);
      languageLabel.textContent = locale.name;

      menu.querySelectorAll("syn-menu-item").forEach((item) => {
        item.toggleAttribute(
          "checked",
          item.getAttribute("value") === locale.code,
        );
      });
    };

    applyLocale("de");

    menu.addEventListener("syn-select", (event) => {
      const selectedLocaleCode =
        event.detail?.item?.getAttribute("value") || "de";
      applyLocale(selectedLocaleCode);
    });
  }
</script>
```
