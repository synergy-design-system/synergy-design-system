## Split Buttons

Create a split button using a button and a dropdown. Use a visually hidden label to ensure the dropdown is accessible to users with assistive devices.

```html
<syn-button-group label="Example Button Group">
  <syn-button>Save</syn-button>
  <syn-dropdown placement="bottom-end">
    <syn-button slot="trigger" variant="primary" caret=""></syn-button>
    <syn-menu>
      <syn-menu-item>Save</syn-menu-item>
      <syn-menu-item>Save as…</syn-menu-item>
      <syn-menu-item>Save all</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</syn-button-group>
```
