## With Dropdowns

Dropdown menus can be placed in a prefix or suffix slot to provide additional options.

```html
<!-- This <div> is only here for positioning the dropdown in storybook -->
<div style="position: relative">
  <syn-breadcrumb>
    <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
    <syn-breadcrumb-item>
      <syn-dropdown>
        <button slot="trigger" class="manual-trigger">
          <syn-icon label="More options" name="more_horiz"></syn-icon>
        </button>
        <syn-menu>
          <syn-menu-item>Breadcrumb Item</syn-menu-item>
          <syn-menu-item>Breadcrumb Item</syn-menu-item>
          <syn-menu-item>Breadcrumb Item</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </syn-breadcrumb-item>
    <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
    <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
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
