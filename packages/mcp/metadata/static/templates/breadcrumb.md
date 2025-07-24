## Breadcrumb Responsive

```html
<div id="breadcrumb-responsive" class="synergy-demo-application">
  <syn-header label="Synergy" burger-menu="hidden"></syn-header>
  <syn-breadcrumb>
    <syn-breadcrumb-item
      >Home<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item class="truncated">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          slot="trigger"
          size="small"
          label="More options"
          name="more_horiz"
          color="currentColor"
        >
        </syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Service and support</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Service category</syn-menu-item
          >
        </syn-menu>
      </syn-dropdown>
      <syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item
      >Service and support<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item
      >Service category<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item>
      <syn-icon
        class="back-icon"
        name="arrow_back"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Service
      <syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item aria-current="page"
      >Current service page<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
  </syn-breadcrumb>
</div>

<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  #storybook-root,
  #root-inner {
    height: 100%;
  }

  syn-header {
    margin-bottom: var(--syn-spacing-x-large);
  }

  .synergy-demo-application {
    display: flex;
    flex-direction: column;
  }

  .synergy-demo-application syn-breadcrumb {
    margin-left: var(--syn-spacing-large);
  }
</style>

<style>
  #breadcrumb-responsive {
    container-type: inline-size;
  }

  /**
      * Styling for medium 
      **/
  #breadcrumb-responsive .truncated syn-icon-button::part(base) {
    padding: 0;
  }
  #breadcrumb-responsive .truncated syn-icon-button {
    vertical-align: middle;
  }

  @container (max-width: 639px) and (min-width: 480px) {
    /* Hide the two breadcrumbs, which should be shown in the drop down */
    #breadcrumb-responsive syn-breadcrumb-item:nth-of-type(3),
    #breadcrumb-responsive syn-breadcrumb-item:nth-of-type(4) {
      display: none;
    }
  }

  /**
      * Styling for large
      **/
  @container (min-width: 640px) {
    #breadcrumb-responsive .truncated {
      display: none;
    }
  }

  /**
      * Styling for large and medium 
      **/
  @container (min-width: 480px) {
    /* Hide the back icon for the medium and large size */
    #breadcrumb-responsive .back-icon {
      display: none;
    }
  }

  /**
      * Styling for small 
      **/
  @container (max-width: 479px) {
    /* Hide the separator of the breadcrumb */
    #breadcrumb-responsive syn-breadcrumb-item::part(separator) {
      display: none;
    }

    /* Only show the previous page breadcrumb */
    #breadcrumb-responsive syn-breadcrumb-item:not(:nth-last-of-type(2)) {
      display: none;
    }
  }
</style>
```

---

## Breadcrumb Truncated

```html
<div id="breadcrumb-truncated" class="synergy-demo-application">
  <syn-header label="Synergy" burger-menu="hidden"></syn-header>
  <syn-breadcrumb>
    <syn-breadcrumb-item
      >Home<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item class="truncated">
      <syn-dropdown placement="bottom-start">
        <syn-icon-button
          slot="trigger"
          size="small"
          label="More options"
          name="more_horiz"
          color="currentColor"
        >
        </syn-icon-button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Service and support</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Service category</syn-menu-item
          >
        </syn-menu>
      </syn-dropdown>
      <syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item>
      Service
      <syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item aria-current="page"
      >Current service page<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
  </syn-breadcrumb>
</div>

<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  #storybook-root,
  #root-inner {
    height: 100%;
  }

  syn-header {
    margin-bottom: var(--syn-spacing-x-large);
  }

  .synergy-demo-application {
    display: flex;
    flex-direction: column;
  }

  .synergy-demo-application syn-breadcrumb {
    margin-left: var(--syn-spacing-large);
  }
</style>

<style>
  #breadcrumb-truncated .truncated syn-icon-button::part(base) {
    padding: 0;
  }
  #breadcrumb-truncated .truncated syn-icon-button {
    vertical-align: middle;
  }
</style>
```

---

## Breadcrumb Short

```html
<div id="breadcrumb-short" class="synergy-demo-application">
  <syn-header label="Synergy" burger-menu="hidden"></syn-header>
  <syn-breadcrumb>
    <syn-breadcrumb-item
      >Home<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item
      >Service and support<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item
      >Service category<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item>
      <syn-icon
        class="back-icon"
        name="arrow_back"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Service
      <syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item aria-current="page"
      >Current service page<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
  </syn-breadcrumb>
</div>

<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  #storybook-root,
  #root-inner {
    height: 100%;
  }

  syn-header {
    margin-bottom: var(--syn-spacing-x-large);
  }

  .synergy-demo-application {
    display: flex;
    flex-direction: column;
  }

  .synergy-demo-application syn-breadcrumb {
    margin-left: var(--syn-spacing-large);
  }
</style>

<style>
  /* Hide the separator of the breadcrumb */
  #breadcrumb-short syn-breadcrumb-item::part(separator) {
    display: none;
  }

  /* Only show the previous page breadcrumb */
  #breadcrumb-short syn-breadcrumb-item:not(:nth-last-of-type(2)) {
    display: none;
  }
</style>
```
