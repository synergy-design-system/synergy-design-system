## Default

Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy. Breadcrumbs are usually placed before a page’s main content with the current page shown last to indicate the user’s position in the navigation.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item aria-current="page"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
</syn-breadcrumb>
```

---

## Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you’ll need to add event listeners to handle clicks.For websites, you’ll probably want to use links instead. You can make any breadcrumb item a link by applying an href attribute to it. Now, when the user activates it, they’ll be taken to the corresponding page — no event listeners required.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item href="#" target="_blank" aria-current="page"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
</syn-breadcrumb>
```

---

## Prefixes

Use the prefix slot to add content before any breadcrumb item.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item>
    <syn-icon
      slot="prefix"
      name="home"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Breadcrumb Item
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
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item aria-current="page"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
</syn-breadcrumb>
```

---

## Suffixes

Use the suffix slot to add content after any breadcrumb item.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item aria-current="page">
    Breadcrumb Item
    <syn-icon
      slot="suffix"
      name="security"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
</syn-breadcrumb>
```

---

## With Dropdowns

Dropdown menus can be placed in a prefix or suffix slot to provide additional options.

```html
<!-- This <div> is only here for positioning the dropdown in storybook -->
<div style="position: relative">
  <syn-breadcrumb>
    <syn-breadcrumb-item
      >Breadcrumb Item<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item>
      <syn-dropdown placement="bottom-start">
        <button slot="trigger" class="manual-trigger">
          <syn-icon
            label="More options"
            name="more_horiz"
            role="img"
            aria-label="More options"
            library="default"
          ></syn-icon>
        </button>
        <syn-menu role="menu">
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
            >Breadcrumb Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Breadcrumb Item</syn-menu-item
          >
          <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
            >Breadcrumb Item</syn-menu-item
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
      >Breadcrumb Item<syn-icon
        name="chevron-down"
        library="system"
        class="ltr"
        data-default=""
        slot="separator"
        aria-hidden="true"
      ></syn-icon
    ></syn-breadcrumb-item>
    <syn-breadcrumb-item aria-current="page"
      >Breadcrumb Item<syn-icon
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
  .manual-trigger {
    appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    font-size: var(--syn-font-size-small);
    margin: 0;
    padding: 0;
  }
</style>
```
