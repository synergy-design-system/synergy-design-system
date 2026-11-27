## Breadcrumb Short

```html
<div id="breadcrumb-short" class="synergy-demo-application">
  <syn-header label="Synergy"></syn-header>
  <syn-breadcrumb>
    <syn-breadcrumb-item>Home</syn-breadcrumb-item>
    <syn-breadcrumb-item>Service and support</syn-breadcrumb-item>
    <syn-breadcrumb-item>Service category</syn-breadcrumb-item>
    <syn-breadcrumb-item>
      <syn-icon class="back-icon" name="arrow_back" slot="prefix"></syn-icon>
      Service
    </syn-breadcrumb-item>
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
  /* Hide the separator of the breadcrumb */
  #breadcrumb-short syn-breadcrumb-item::part(separator) {
    display: none;
  }

  /* Only show the previous page breadcrumb */
  #breadcrumb-short syn-breadcrumb-item:not(:nth-last-of-type(2)) {
    display: none;
  }
</style>
```
