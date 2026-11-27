## Meta Navigation

Use the Meta Navigation slot to add additional functionalities to your application. Please be aware of the guidelines regarding the order of icons in the toolbar.Important: The Options Menu doesn’t handle any responsive behaviour, e. g. if there is not enough space for all items in different screen sizes. You have to make sure yourself, that your app works correctly and e. g. move elements into the footer of the side navigation or inside a “more” button in the Options Menu.

```html
<syn-header label="App Name">
  <nav slot="meta-navigation">
    <syn-icon-button name="apps" label="Apps"></syn-icon-button>
    <syn-icon-button name="account_circle" label="Account"></syn-icon-button>
    <syn-icon-button name="more_vert" label="More"></syn-icon-button>
  </nav>
</syn-header>
```
