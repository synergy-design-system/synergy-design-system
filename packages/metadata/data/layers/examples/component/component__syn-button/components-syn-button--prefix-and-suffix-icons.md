## Prefix And Suffix Icons

Use the prefix and suffix slots to add icons.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <div
    style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)"
  >
    <syn-button size="small">
      <syn-icon slot="prefix" name="settings"></syn-icon>
      Settings
    </syn-button>

    <syn-button size="small">
      <syn-icon slot="suffix" name="refresh"></syn-icon>
      Refresh
    </syn-button>

    <syn-button size="small">
      <syn-icon slot="prefix" name="link"></syn-icon>
      <syn-icon slot="suffix" name="launch"></syn-icon>
      Open
    </syn-button>
  </div>

  <div
    style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)"
  >
    <syn-button>
      <syn-icon slot="prefix" name="settings"></syn-icon>
      Settings
    </syn-button>

    <syn-button>
      <syn-icon slot="suffix" name="refresh"></syn-icon>
      Refresh
    </syn-button>

    <syn-button>
      <syn-icon slot="prefix" name="link"></syn-icon>
      <syn-icon slot="suffix" name="launch"></syn-icon>
      Open
    </syn-button>
  </div>

  <div
    style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)"
  >
    <syn-button size="large">
      <syn-icon slot="prefix" name="settings"></syn-icon>
      Settings
    </syn-button>

    <syn-button size="large">
      <syn-icon slot="suffix" name="refresh"></syn-icon>
      Refresh
    </syn-button>

    <syn-button size="large">
      <syn-icon slot="prefix" name="link"></syn-icon>
      <syn-icon slot="suffix" name="launch"></syn-icon>
      Open
    </syn-button>
  </div>
</div>
```
