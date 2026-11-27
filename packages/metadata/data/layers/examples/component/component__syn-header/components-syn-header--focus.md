## Focus

The focus event gives the user feedback that a link in the logo has been focused by the keyboard interaction and that the link is ready to be navigated to.

```html
<style>
  .custom-header-link-with-logo {
    color: var(--syn-logo-color);
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
<syn-header label="App Name">
  <a href="#" slot="logo" tabindex="0" class="custom-header-link-with-logo">
    <syn-icon
      name="logo-color"
      library="system"
      label="Custom Logo with link"
    ></syn-icon>
  </a>
</syn-header>
```
