## Tag Group

```html
<div>
  <form class="filter-form">
    <h1>Capacitive proximity sensors</h1>

    <syn-details size="small" summary="Hide filters" open="">
      <div class="filter-group">
        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Housing </syn-button>
          <syn-menu id="filter-1">
            <syn-menu-item type="checkbox" value="metric">metric</syn-menu-item>

            <syn-menu-item type="checkbox" value="rectangular"
              >rectangular</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Cable material - 1 </syn-button>
          <syn-menu id="filter-2">
            <syn-menu-item type="checkbox" checked="" value="PUR"
              >PUR</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="PVC">PVC</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Length of cable - 4 </syn-button>
          <syn-menu id="filter-3">
            <syn-menu-item type="checkbox" checked="" value="0.2 m"
              >0.2 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.3 m"
              >0.3 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.7 m"
              >0.7 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.23 m"
              >0.23 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="2 m">2 m</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Electrical wiring </syn-button>
          <syn-menu id="filter-4">
            <syn-menu-item type="checkbox" value="AC 2-wire"
              >AC 2-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="DC 3-wire"
              >DC 3-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="DC 4-wire"
              >DC 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Switching output </syn-button>
          <syn-menu id="filter-5">
            <syn-menu-item type="checkbox" value="NPN">NPN</syn-menu-item>

            <syn-menu-item type="checkbox" value="PNP">PNP</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Connection type - 1 </syn-button>
          <syn-menu id="filter-6">
            <syn-menu-item type="checkbox" value="Cable, 2-wire"
              >Cable, 2-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="Cable, 3-wire"
              >Cable, 3-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="Cable, 4-wire"
              >Cable, 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>
      </div>
    </syn-details>

    <div class="filter-tags">
      <syn-tag-group label-position="start" label="Cable material">
        <syn-tag removable=""> PUR </syn-tag>
      </syn-tag-group>

      <syn-tag-group label-position="start" label="Length of cable">
        <syn-tag removable=""> 0.2 m </syn-tag>

        <syn-tag removable=""> 0.3 m </syn-tag>

        <syn-tag removable=""> 0.7 m </syn-tag>

        <syn-tag removable=""> 0.23 m </syn-tag>
      </syn-tag-group>

      <syn-tag-group label-position="start" label="Connection type">
        <syn-tag removable=""> Cable, 3-wire </syn-tag>
      </syn-tag-group>

      <syn-button class="clear-button" variant="text">
        <syn-icon name="delete" slot="prefix"></syn-icon>
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
        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Housing </syn-button>
          <syn-menu id="filter-1">
            <syn-menu-item type="checkbox" value="metric">metric</syn-menu-item>

            <syn-menu-item type="checkbox" value="rectangular"
              >rectangular</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Cable material - 1 </syn-button>
          <syn-menu id="filter-2">
            <syn-menu-item type="checkbox" checked="" value="PUR"
              >PUR</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="PVC">PVC</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Length of cable - 4 </syn-button>
          <syn-menu id="filter-3">
            <syn-menu-item type="checkbox" checked="" value="0.2 m"
              >0.2 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.3 m"
              >0.3 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.7 m"
              >0.7 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="0.23 m"
              >0.23 m</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="2 m">2 m</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Electrical wiring </syn-button>
          <syn-menu id="filter-4">
            <syn-menu-item type="checkbox" value="AC 2-wire"
              >AC 2-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="DC 3-wire"
              >DC 3-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="DC 4-wire"
              >DC 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Switching output </syn-button>
          <syn-menu id="filter-5">
            <syn-menu-item type="checkbox" value="NPN">NPN</syn-menu-item>

            <syn-menu-item type="checkbox" value="PNP">PNP</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <syn-dropdown stay-open-on-select="" sync="width">
          <syn-button slot="trigger" caret=""> Connection type - 1 </syn-button>
          <syn-menu id="filter-6">
            <syn-menu-item type="checkbox" value="Cable, 2-wire"
              >Cable, 2-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" checked="" value="Cable, 3-wire"
              >Cable, 3-wire</syn-menu-item
            >

            <syn-menu-item type="checkbox" value="Cable, 4-wire"
              >Cable, 4-wire</syn-menu-item
            >
          </syn-menu>
        </syn-dropdown>
      </div>
    </syn-details>

    <div class="filter-tags">
      <syn-tag-group label-position="start" label="Cable material">
        <syn-tag removable=""> PUR </syn-tag>
      </syn-tag-group>

      <syn-tag-group label-position="start" label="Length of cable">
        <syn-tag removable=""> 0.2 m </syn-tag>

        <syn-tag removable=""> 0.3 m </syn-tag>

        <syn-tag removable=""> 0.7 m </syn-tag>

        <syn-tag removable=""> 0.23 m </syn-tag>
      </syn-tag-group>

      <syn-tag-group label-position="start" label="Connection type">
        <syn-tag removable=""> Cable, 3-wire </syn-tag>
      </syn-tag-group>

      <syn-button class="clear-button" variant="text">
        <syn-icon name="delete" slot="prefix"></syn-icon>
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
