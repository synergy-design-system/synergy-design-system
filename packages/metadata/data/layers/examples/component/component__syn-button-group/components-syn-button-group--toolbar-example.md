## Toolbar Example

Create interactive toolbars with button groups.

```html
<div class="button-group-toolbar">
  <syn-button-group label="Download and save">
    <syn-tooltip content="Save">
      <syn-button><syn-icon name="save" label="Save"></syn-icon></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Download">
      <syn-button
        ><syn-icon name="save_alt" label="Download"></syn-icon
      ></syn-button>
    </syn-tooltip>
  </syn-button-group>

  <syn-button-group label="Misc">
    <syn-tooltip content="Edit">
      <syn-button><syn-icon name="edit" label="Edit"></syn-icon></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Settings">
      <syn-button
        ><syn-icon name="settings" label="Settings"></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Preview">
      <syn-button
        ><syn-icon name="wallpaper" label="Preview"></syn-icon
      ></syn-button>
    </syn-tooltip>
  </syn-button-group>

  <syn-button-group>
    <syn-tooltip content="Add">
      <syn-button><syn-icon name="add" label="Add"></syn-icon></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Info">
      <syn-button><syn-icon name="info" label="Info"></syn-icon></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Upload File">
      <syn-button
        ><syn-icon name="upload_file" label="Upload File"></syn-icon
      ></syn-button>
    </syn-tooltip>
  </syn-button-group>
</div>

<style>
  .button-group-toolbar syn-button-group:not(:last-of-type) {
    margin-right: var(--syn-spacing-large);
  }
</style>
```
