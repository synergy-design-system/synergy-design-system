## Tag Group

```html
<div>
  <form class="filter-form">
    <h1>Kapazitive Näherungssensoren</h1>

    <syn-details size="small" summary="Filter ausblenden" open="">
      <syn-icon
        slot="expand-icon"
        name="keyboard_arrow_down"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      <syn-icon
        slot="collapse-icon"
        name="keyboard_arrow_up"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      <div class="filter-group">
        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Leitungsmaterial - 2
          </syn-button>
          <syn-menu id="filter-1" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="Option 1"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
              >Option 1</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="Option 2"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >Option 2</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Option 3"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Option 3</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Leitungslänge - 4
          </syn-button>
          <syn-menu id="filter-2" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="230 mm"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
              >230 mm</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.2 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >0.2 m</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.3 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >0.3 m</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.7 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >0.7 m</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Produktfamilie - 3
          </syn-button>
          <syn-menu id="filter-3" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="Option 1"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
              >Option 1</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="Option 2"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >Option 2</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="Option 3"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >Option 3</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Schaltausgang
          </syn-button>
          <syn-menu id="filter-4" role="menu">
            <syn-menu-item
              type="checkbox"
              value="Option 1"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >Option 1</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Option 2"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Option 2</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Option 3"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Option 3</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Anschlussart
          </syn-button>
          <syn-menu id="filter-5" role="menu">
            <syn-menu-item
              type="checkbox"
              value="Option 1"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >Option 1</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Option 2"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Option 2</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Option 3"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Option 3</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown
          stay-open-on-select=""
          sync="width"
          placement="bottom-start"
        >
          <syn-button
            slot="trigger"
            caret=""
            title=""
            variant="outline"
            size="medium"
          >
            Umgebungstemperatur Betrieb
          </syn-button>
          <syn-menu id="filter-6" role="menu">
            <syn-menu-item
              type="checkbox"
              value="-25°C...80°C"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >-25°C...80°C</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="CQ"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >CQ</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>
      </div>
    </syn-details>

    <div class="filter-tags">
      <syn-tag-group
        label-position="start"
        label="Leitungsmaterial"
        size="medium"
      >
        <syn-tag removable="" size="medium"> Option 1 </syn-tag>

        <syn-tag removable="" size="medium"> Option 2 </syn-tag>
      </syn-tag-group>

      <syn-tag-group label-position="start" label="Leitungslänge" size="medium">
        <syn-tag removable="" size="medium"> 230 mm </syn-tag>

        <syn-tag removable="" size="medium"> 0.2 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.3 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.7 m </syn-tag>
      </syn-tag-group>

      <syn-tag-group
        label-position="start"
        label="Produktfamilie"
        size="medium"
      >
        <syn-tag removable="" size="medium"> Option 1 </syn-tag>

        <syn-tag removable="" size="medium"> Option 2 </syn-tag>

        <syn-tag removable="" size="medium"> Option 3 </syn-tag>
      </syn-tag-group>

      <syn-button class="clear-button" variant="text" title="" size="medium">
        <syn-icon
          name="delete"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Alle Filter löschen
      </syn-button>
    </div>
  </form>

  <style>
    .filter-form {
      background: var(--syn-page-background-color);
      container-type: inline-size;
      max-width: 1136px;
      padding: var(--syn-spacing-x-large) var(--syn-spacing-medium);
    }

    .filter-form h1 {
      color: var(--syn-typography-color-text);
      font: var(--syn-heading-3x-large);
      margin: 0 0 var(--syn-spacing-2x-large);
      padding: 0;
    }

    .filter-form syn-details::part(base) {
      border-bottom: 0;
    }

    /* Hide the syn-details header per default. Only needed on mobile */
    .filter-form syn-details::part(header) {
      display: none;
    }

    .filter-form syn-details::part(content) {
      padding-bottom: 0;
    }

    .filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--syn-spacing-medium);
      margin-bottom: var(--syn-spacing-x-large);
    }

    .filter-tags {
      align-items: center;
      background: var(--syn-page-background-color-muted);
      display: flex;
      flex-wrap: wrap;
      gap: var(--syn-spacing-large);
      padding: var(--syn-spacing-large);
    }

    @container (max-width: 420px) {
      .filter-form h1 {
        font: var(--syn-heading-2x-large);
        margin-bottom: var(--syn-spacing-large);
      }

      .filter-form .filter-group {
        flex-direction: column;
        margin-bottom: var(--syn-spacing-2x-large);
      }

      /* Show the syn-details header */
      .filter-form syn-details::part(header) {
        display: flex;
        justify-self: end;
      }

      .filter-form .filter-group syn-dropdown syn-button {
        width: 100%;
        display: block;
      }

      .filter-form .filter-group syn-dropdown syn-button::part(label) {
        width: 100%;
      }

      .filter-form .filter-tags {
        align-items: flex-start;
        flex-direction: column;
      }

      /* Center the clear button on mobile */
      .clear-button {
        margin: 0 auto;
      }
    }
  </style>
</div>
```
