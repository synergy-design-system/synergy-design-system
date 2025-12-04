## Default

The header is used to indicate the name of the app, provide important actions in a toolbar and a navigation.

```html
<syn-header burger-menu="hidden">
  <span slot="label">App Name</span>
</syn-header>
```

---

## Label

Use the label attribute to change the app name.

```html
<syn-header label="A new label" burger-menu="hidden"></syn-header>
```

---

## Logo

Use the logo slot to change the app logo. Usually this is only needed in whitelabel solutions, when the SICK branding explicitly has to be hidden.

```html
<syn-header label="App Name" burger-menu="hidden">
  <span
    style="
      width: 32px;
      height: 32px;
      border-radius: 32px;
      background: var(--syn-color-neutral-1000);
      display: block;
    "
    slot="logo"
  ></span>
</syn-header>
```

---

## Focus

The focus event gives the user feedback that a link in the logo has been focused by the keyboard interaction and that the link is ready to be navigated to.

```html
<style>
  .custom-header-link-with-logo {
    color: var(--syn-logo-color) !important;
  }
  .custom-header-link-with-logo syn-icon {
    display: block;
    width: auto;
    height: 32px;
  }

  /* Safari fix for ##623 */
  .custom-header-link-with-logo syn-icon::part(svg) {
    width: auto;
  }
</style>
<syn-header label="App Name" burger-menu="hidden">
  <a href="#" slot="logo" tabindex="0" class="custom-header-link-with-logo">
    <syn-icon
      name="logo-color"
      library="system"
      label="Custom Logo with link"
      role="img"
      aria-label="Custom Logo with link"
    ></syn-icon>
  </a>
</syn-header>
```

---

## Meta Navigation

Use the Meta Navigation slot to add additional functionalities to your application. Please be aware of the guidelines regarding the order of icons in the toolbar.Important: The Options Menu doesn’t handle any responsive behaviour, e. g. if there is not enough space for all items in different screen sizes. You have to make sure yourself, that your app works correctly and e. g. move elements into the footer of the side navigation or inside a “more” button in the Options Menu.

```html
<syn-header label="App Name" burger-menu="hidden">
  <nav slot="meta-navigation">
    <syn-icon-button
      name="apps"
      label="Apps"
      size="inherit"
      color="currentColor"
    ></syn-icon-button>
    <syn-icon-button
      name="account_circle"
      label="Account"
      size="inherit"
      color="currentColor"
    ></syn-icon-button>
    <syn-icon-button
      name="more_vert"
      label="More"
      size="inherit"
      color="currentColor"
    ></syn-icon-button>
  </nav>
</syn-header>
```

---

## Navigation

Use the top navigation slot to add syn-navigation and horizontal syn-navigation-items.

```html
<syn-header label="App Name" burger-menu="hidden">
  <syn-prio-nav slot="navigation">
    <syn-nav-item current="" horizontal="true">Domains</syn-nav-item>
    <syn-nav-item horizontal="true">Projects</syn-nav-item>
    <syn-nav-item horizontal="true">Trainings</syn-nav-item>
    <syn-nav-item horizontal="true">Evaluations</syn-nav-item>
    <syn-nav-item horizontal="true">Deployments</syn-nav-item>
  </syn-prio-nav>
</syn-header>
```

---

## Burger Menu

Use the Burger Menu as trigger to open and close the Navigation. In the open state, the icon changes to a cancel icon. This will be hidden, if you use a rail navigation.

```html
<syn-header burger-menu="closed" label="App Name"> </syn-header>
```
