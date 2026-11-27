## Breadcrumb Truncated

```html
<div id="breadcrumb-truncated" class="synergy-demo-application">
  <syn-header label="Synergy"></syn-header>
  <syn-breadcrumb>
    <syn-breadcrumb-item>Home</syn-breadcrumb-item>
    <syn-breadcrumb-item class="truncated">
      <syn-dropdown>
        <syn-icon-button
          slot="trigger"
          size="small"
          label="More options"
          name="more_horiz"
        >
        </syn-icon-button>
        <syn-menu>
          <syn-menu-item>Service and support</syn-menu-item>
          <syn-menu-item>Service category</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </syn-breadcrumb-item>
    <syn-breadcrumb-item> Service </syn-breadcrumb-item>
    <syn-breadcrumb-item>Current service page</syn-breadcrumb-item>
  </syn-breadcrumb>
</div>

<style>
  body {
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
