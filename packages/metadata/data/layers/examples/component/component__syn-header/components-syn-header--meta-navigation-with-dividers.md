## Meta Navigation With Dividers

If you need different icon groups or a separator between them, add a <syn-divider> between them.

```html
<syn-header label="App Name">
  <nav slot="meta-navigation">
    <syn-icon-button name="settings_outline" label="Settings"></syn-icon-button>
    <syn-icon-button
      name="insert_chart_outlined"
      label="Analytics"
    ></syn-icon-button>
    <syn-divider vertical=""></syn-divider>
    <syn-icon-button name="dark_mode" label="Dark Mode"></syn-icon-button>
    <syn-divider vertical=""></syn-divider>
    <syn-icon-button name="language" label="Language"></syn-icon-button>
    <syn-icon-button name="login" label="Login"></syn-icon-button>
  </nav>
</syn-header>
```
