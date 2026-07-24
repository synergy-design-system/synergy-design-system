## Default

Button groups can be used to group related buttons into sections.

```html
<syn-button-group>
  <syn-button>Left</syn-button>
  <syn-button>Center</syn-button>
  <syn-button>Right</syn-button>
</syn-button-group>
```

---

## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline. There is no Text variant.

```html
<div
  style="display: flex; gap: var(--syn-spacing-large); flex-direction: column"
>
  <syn-button-group variant="outline" label="Variant (outline)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>

  <syn-button-group variant="filled" label="Variant (filled)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
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
  <syn-button-group size="small" label="Alignment (small)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>

  <syn-button-group size="medium" label="Alignment (medium)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>

  <syn-button-group size="large" label="Alignment (large)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>
</div>
```

---

## Dropdowns In Button Groups

 Dropdowns can be placed inside button groups as long as the trigger is an <syn-button> element. 

```html
<syn-button-group label="Example Button Group">
  <syn-button>Button</syn-button>
  <syn-button>Button</syn-button>
  <syn-dropdown placement="bottom-end">
    <syn-button slot="trigger" caret="">Dropdown</syn-button>
    <syn-menu>
      <syn-menu-item>Save</syn-menu-item>
      <syn-menu-item>Save as…</syn-menu-item>
      <syn-menu-item>Save all</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</syn-button-group>
```

---

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

---

## Tooltips In Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html
<syn-button-group label="Example Button Group">
  <syn-tooltip content="I am on the left">
    <syn-button>Left</syn-button>
  </syn-tooltip>
  <syn-tooltip content="I am in the center">
    <syn-button>Center</syn-button>
  </syn-tooltip>
  <syn-tooltip content="I am on the right">
    <syn-button>Right</syn-button>
  </syn-tooltip>
</syn-button-group>
```

---

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
