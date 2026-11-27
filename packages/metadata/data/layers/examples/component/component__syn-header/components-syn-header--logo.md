## Logo

Use the logo slot to change the app logo. Usually this is only needed in whitelabel solutions, when the SICK branding explicitly has to be hidden.

```html
<syn-header label="App Name">
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
