---
"@synergy-design-system/angular": minor
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
"@synergy-design-system/react": minor
"@synergy-design-system/tokens": minor
"@synergy-design-system/vue": minor
---

feat: ✨ Allow `<syn-divider>` as a separator in meta-navigation of `<syn-header>` (#1130)

This release adds the possiblity to use `<syn-divider>` as a separator between items in the `<syn-header>` metanavigation.
It will automatically set the correct `height` on vertically aligned `<syn-dividers>`.

You may use it via:

```html
<syn-header label="App Name">
  <nav slot="meta-navigation">
    <syn-icon-button name="settings_outline" label="Settings"></syn-icon-button>
    <syn-icon-button name="insert_chart_outlined" label="Analytics"></syn-icon-button>
    <syn-divider vertical></syn-divider>
    <syn-icon-button name="dark_mode" label="Dark Mode"></syn-icon-button>
    <syn-divider vertical></syn-divider>
    <syn-icon-button name="language" label="Language"></syn-icon-button>
    <syn-icon-button name="login" label="Login"></syn-icon-button>
  </nav>
</syn-header>
```

or via directly slotting the `<syn-divider>` via

```html
<syn-header label="App Name">
  <syn-icon-button slot="meta-navigation" name="settings_outline" label="Settings"></syn-icon-button>
  <syn-icon-button slot="meta-navigation" name="insert_chart_outlined" label="Analytics"></syn-icon-button>
  <syn-divider vertical slot="meta-navigation"></syn-divider>
  <syn-icon-button slot="meta-navigation" name="dark_mode" label="Dark Mode"></syn-icon-button>
  <syn-divider vertical slot="meta-navigation"></syn-divider>
  <syn-icon-button slot="meta-navigation" name="language" label="Language"></syn-icon-button>
  <syn-icon-button slot="meta-navigation" name="login" label="Login"></syn-icon-button>
</syn-header>
```

`<syn-header>` now also exposes a new `cssproperty` `--metanavigation-item-size` that can be used to define the size of rendered `<syn-icon-buttons>`, as well as the height of `<syn-divider>`
