## Default

Button groups can be used to group related buttons into sections.

```html
<syn-button-group size="medium" variant="outline">
  <syn-button title="" variant="outline" size="medium">Left</syn-button>
  <syn-button title="" variant="outline" size="medium">Center</syn-button>
  <syn-button title="" variant="outline" size="medium">Right</syn-button>
</syn-button-group>
```

---

## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline. There is no Text variant.

```html
<div
  style="display: flex; gap: var(--syn-spacing-large); flex-direction: column"
>
  <syn-button-group variant="outline" label="Variant (outline)" size="medium">
    <syn-button title="" variant="outline" size="medium">Left</syn-button>
    <syn-button title="" variant="outline" size="medium">Center</syn-button>
    <syn-button title="" variant="outline" size="medium">Right</syn-button>
  </syn-button-group>

  <syn-button-group variant="filled" label="Variant (filled)" size="medium">
    <syn-button title="" variant="filled" size="medium">Left</syn-button>
    <syn-button title="" variant="filled" size="medium">Center</syn-button>
    <syn-button title="" variant="filled" size="medium">Right</syn-button>
  </syn-button-group>
</div>
```

---

## Button Sizes

All button sizes are supported. The size of the button-group will be used to determine the size of the buttons.

```html
<div
  style="display: flex; gap: var(--syn-spacing-large); flex-direction: column"
>
  <syn-button-group size="small" label="Alignment (small)" variant="outline">
    <syn-button title="" variant="outline" size="small">Left</syn-button>
    <syn-button title="" variant="outline" size="small">Center</syn-button>
    <syn-button title="" variant="outline" size="small">Right</syn-button>
  </syn-button-group>

  <syn-button-group size="medium" label="Alignment (medium)" variant="outline">
    <syn-button title="" variant="outline" size="medium">Left</syn-button>
    <syn-button title="" variant="outline" size="medium">Center</syn-button>
    <syn-button title="" variant="outline" size="medium">Right</syn-button>
  </syn-button-group>

  <syn-button-group size="large" label="Alignment (large)" variant="outline">
    <syn-button title="" variant="outline" size="large">Left</syn-button>
    <syn-button title="" variant="outline" size="large">Center</syn-button>
    <syn-button title="" variant="outline" size="large">Right</syn-button>
  </syn-button-group>
</div>
```

---

## Dropdowns In Button Groups

 Dropdowns can be placed inside button groups as long as the trigger is an <syn-button> element. 

```html
<syn-button-group label="Example Button Group" size="medium" variant="outline">
  <syn-button title="" variant="outline" size="medium">Button</syn-button>
  <syn-button title="" variant="outline" size="medium">Button</syn-button>
  <syn-dropdown placement="bottom-end">
    <syn-button slot="trigger" caret="" title="" variant="outline" size="medium"
      >Dropdown</syn-button
    >
    <syn-menu role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Save</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Save as…</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Save all</syn-menu-item
      >
    </syn-menu>
  </syn-dropdown>
</syn-button-group>
```

---

## Split Buttons

Create a split button using a button and a dropdown. Use a visually hidden label to ensure the dropdown is accessible to users with assistive devices.

```html
<syn-button-group label="Example Button Group" size="medium" variant="outline">
  <syn-button title="" variant="outline" size="medium">Save</syn-button>
  <syn-dropdown placement="bottom-end">
    <syn-button
      slot="trigger"
      variant="outline"
      caret=""
      title=""
      size="medium"
    ></syn-button>
    <syn-menu role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Save</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Save as…</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Save all</syn-menu-item
      >
    </syn-menu>
  </syn-dropdown>
</syn-button-group>
```

---

## Tooltips In Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html
<syn-button-group label="Example Button Group" size="medium" variant="outline">
  <syn-tooltip content="I am on the left">
    <syn-button title="" variant="outline" size="medium">Left</syn-button>
  </syn-tooltip>
  <syn-tooltip content="I am in the center">
    <syn-button title="" variant="outline" size="medium">Center</syn-button>
  </syn-tooltip>
  <syn-tooltip content="I am on the right">
    <syn-button title="" variant="outline" size="medium">Right</syn-button>
  </syn-tooltip>
</syn-button-group>
```

---

## Toolbar Example

Create interactive toolbars with button groups.

```html
<div class="button-group-toolbar">
  <syn-button-group label="Download and save" size="medium" variant="outline">
    <syn-tooltip content="Save">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="save"
          label="Save"
          role="img"
          aria-label="Save"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Download">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="save_alt"
          label="Download"
          role="img"
          aria-label="Download"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
  </syn-button-group>

  <syn-button-group label="Misc" size="medium" variant="outline">
    <syn-tooltip content="Edit">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="edit"
          label="Edit"
          role="img"
          aria-label="Edit"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Settings">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="settings"
          label="Settings"
          role="img"
          aria-label="Settings"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Preview">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="wallpaper"
          label="Preview"
          role="img"
          aria-label="Preview"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
  </syn-button-group>

  <syn-button-group size="medium" variant="outline">
    <syn-tooltip content="Add">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="add"
          label="Add"
          role="img"
          aria-label="Add"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Info">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="info"
          label="Info"
          role="img"
          aria-label="Info"
          library="default"
        ></syn-icon
      ></syn-button>
    </syn-tooltip>
    <syn-tooltip content="Upload File">
      <syn-button title="" variant="outline" size="medium"
        ><syn-icon
          name="upload_file"
          label="Upload File"
          role="img"
          aria-label="Upload File"
          library="default"
        ></syn-icon
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
