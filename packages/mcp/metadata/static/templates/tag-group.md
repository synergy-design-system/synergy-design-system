## Tag Group

```html
<div>
  <form class="filter-form">
    <h1>Capacitive proximity sensors</h1>

    <syn-details size="small" summary="Hide filters" open="">
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
            Housing
          </syn-button>
          <syn-menu id="filter-1" role="menu">
            <syn-menu-item
              type="checkbox"
              value="metric"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >metric</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="rectangular"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >rectangular</syn-menu-item
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
            Cable material - 1
          </syn-button>
          <syn-menu id="filter-2" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="PUR"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
              >PUR</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="PVC"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >PVC</syn-menu-item
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
            Length of cable - 4
          </syn-button>
          <syn-menu id="filter-3" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.2 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
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

            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.23 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >0.23 m</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="2 m"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >2 m</syn-menu-item
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
            Electrical wiring
          </syn-button>
          <syn-menu id="filter-4" role="menu">
            <syn-menu-item
              type="checkbox"
              value="AC 2-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >AC 2-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="DC 3-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >DC 3-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="DC 4-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >DC 4-wire</syn-menu-item
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
            Switching output
          </syn-button>
          <syn-menu id="filter-5" role="menu">
            <syn-menu-item
              type="checkbox"
              value="NPN"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >NPN</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="PNP"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >PNP</syn-menu-item
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
            Connection type - 1
          </syn-button>
          <syn-menu id="filter-6" role="menu">
            <syn-menu-item
              type="checkbox"
              value="Cable, 2-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >Cable, 2-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="Cable, 3-wire"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >Cable, 3-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Cable, 4-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Cable, 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>
      </div>
    </syn-details>

    <div class="filter-tags">
      <syn-tag-group
        label-position="start"
        label="Cable material"
        size="medium"
      >
        <syn-tag removable="" size="medium"> PUR </syn-tag>
      </syn-tag-group>

      <syn-tag-group
        label-position="start"
        label="Length of cable"
        size="medium"
      >
        <syn-tag removable="" size="medium"> 0.2 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.3 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.7 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.23 m </syn-tag>
      </syn-tag-group>

      <syn-tag-group
        label-position="start"
        label="Connection type"
        size="medium"
      >
        <syn-tag removable="" size="medium"> Cable, 3-wire </syn-tag>
      </syn-tag-group>

      <syn-button class="clear-button" variant="text" title="" size="medium">
        <syn-icon
          name="delete"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Delete all filters
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

---

## ↳ Tablet

```html
<div>
  <form class="filter-form">
    <h1>Capacitive proximity sensors</h1>

    <syn-details size="small" summary="Hide filters" open="">
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
            Housing
          </syn-button>
          <syn-menu id="filter-1" role="menu">
            <syn-menu-item
              type="checkbox"
              value="metric"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >metric</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="rectangular"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >rectangular</syn-menu-item
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
            Cable material - 1
          </syn-button>
          <syn-menu id="filter-2" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="PUR"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
              >PUR</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="PVC"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >PVC</syn-menu-item
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
            Length of cable - 4
          </syn-button>
          <syn-menu id="filter-3" role="menu">
            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.2 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="0"
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

            <syn-menu-item
              type="checkbox"
              checked=""
              value="0.23 m"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >0.23 m</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="2 m"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >2 m</syn-menu-item
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
            Electrical wiring
          </syn-button>
          <syn-menu id="filter-4" role="menu">
            <syn-menu-item
              type="checkbox"
              value="AC 2-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >AC 2-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="DC 3-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >DC 3-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="DC 4-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >DC 4-wire</syn-menu-item
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
            Switching output
          </syn-button>
          <syn-menu id="filter-5" role="menu">
            <syn-menu-item
              type="checkbox"
              value="NPN"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >NPN</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="PNP"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >PNP</syn-menu-item
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
            Connection type - 1
          </syn-button>
          <syn-menu id="filter-6" role="menu">
            <syn-menu-item
              type="checkbox"
              value="Cable, 2-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="0"
              >Cable, 2-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              checked=""
              value="Cable, 3-wire"
              role="menuitemcheckbox"
              aria-checked="true"
              aria-disabled="false"
              tabindex="-1"
              >Cable, 3-wire</syn-menu-item
            >

            <syn-menu-item
              type="checkbox"
              value="Cable, 4-wire"
              role="menuitemcheckbox"
              aria-checked="false"
              aria-disabled="false"
              tabindex="-1"
              >Cable, 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>
      </div>
    </syn-details>

    <div class="filter-tags">
      <syn-tag-group
        label-position="start"
        label="Cable material"
        size="medium"
      >
        <syn-tag removable="" size="medium"> PUR </syn-tag>
      </syn-tag-group>

      <syn-tag-group
        label-position="start"
        label="Length of cable"
        size="medium"
      >
        <syn-tag removable="" size="medium"> 0.2 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.3 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.7 m </syn-tag>

        <syn-tag removable="" size="medium"> 0.23 m </syn-tag>
      </syn-tag-group>

      <syn-tag-group
        label-position="start"
        label="Connection type"
        size="medium"
      >
        <syn-tag removable="" size="medium"> Cable, 3-wire </syn-tag>
      </syn-tag-group>

      <syn-button class="clear-button" variant="text" title="" size="medium">
        <syn-icon
          name="delete"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Delete all filters
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
