## Default

Dropdowns expose additional content that “drops down” in a panel.Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.Dropdowns are designed to work well with menus to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications (e.g. color picker). The API gives you complete control over showing, hiding, and positioning the panel.

```html
<div style="position: relative">
  <syn-dropdown placement="bottom-start">
    <syn-button
      slot="trigger"
      caret=""
      title=""
      variant="outline"
      size="medium"
      data-optional=""
      data-valid=""
      >Dropdown</syn-button
    >
    <syn-menu style="min-width: 240px" role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Dropdown Item 1</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Dropdown Item 2</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Dropdown Item 3</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item
        type="checkbox"
        checked=""
        role="menuitemcheckbox"
        aria-checked="true"
        aria-disabled="false"
        tabindex="-1"
        >Checkbox</syn-menu-item
      >
      <syn-menu-item
        disabled=""
        role="menuitem"
        aria-disabled="true"
        tabindex="-1"
        >Disabled</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
        Prefix
        <syn-icon
          slot="prefix"
          name="wallpaper"
          aria-hidden="true"
          library="default"
        ></syn-icon>
      </syn-menu-item>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
        Suffix Icon
        <syn-icon
          slot="suffix"
          name="wallpaper"
          aria-hidden="true"
          library="default"
        ></syn-icon>
      </syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Getting The Selected Item

When dropdowns are used with menus, you can listen for the syn-select event to determine which menu item was selected. The menu item element will be exposed in event.detail.item. You can set value props to make it easier to identify commands. DEV: Alternatively, you can listen for the click event on individual menu items. Note that, using this approach, disabled menu items will still emit a click event.

```html
<div style="position: relative">
  <div class="dropdown-selection">
    <syn-dropdown placement="bottom-start">
      <syn-button
        slot="trigger"
        caret=""
        title=""
        variant="outline"
        size="medium"
        data-optional=""
        data-valid=""
        >Edit</syn-button
      >
      <syn-menu style="min-width: 240px" role="menu">
        <syn-menu-item
          value="cut"
          role="menuitem"
          aria-disabled="false"
          tabindex="0"
          >Cut</syn-menu-item
        >
        <syn-menu-item
          value="copy"
          role="menuitem"
          aria-disabled="false"
          tabindex="-1"
          >Copy</syn-menu-item
        >
        <syn-menu-item
          value="paste"
          role="menuitem"
          aria-disabled="false"
          tabindex="-1"
          >Paste</syn-menu-item
        >
      </syn-menu>
    </syn-dropdown>
  </div>
</div>
```

---

## Placement

The preferred placement of the dropdown can be set with the placement attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html
<div style="position: relative">
  <syn-dropdown placement="right-start">
    <syn-button
      slot="trigger"
      caret=""
      title=""
      variant="outline"
      size="medium"
      data-optional=""
      data-valid=""
      >Edit</syn-button
    >
    <syn-menu style="min-width: 240px" role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Cut</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Copy</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Paste</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Find</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Replace</syn-menu-item
      >
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Distance

The distance from the panel to the trigger can be customized using the distance attribute. This value is specified in pixels.

```html
<div style="position: relative">
  <syn-dropdown distance="30" placement="bottom-start">
    <syn-button
      slot="trigger"
      caret=""
      title=""
      variant="outline"
      size="medium"
      data-optional=""
      data-valid=""
      >Edit</syn-button
    >
    <syn-menu style="min-width: 240px" role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Cut</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Copy</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Paste</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Find</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Replace</syn-menu-item
      >
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Skidding

The offset of the panel along the trigger can be customized using the skidding attribute. This value is specified in pixels.

```html
<div style="position: relative">
  <syn-dropdown skidding="30" placement="bottom-start">
    <syn-button
      slot="trigger"
      caret=""
      title=""
      variant="outline"
      size="medium"
      data-optional=""
      data-valid=""
      >Edit</syn-button
    >
    <syn-menu style="min-width: 240px" role="menu">
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
        >Cut</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Copy</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Paste</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Find</syn-menu-item
      >
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
        >Replace</syn-menu-item
      >
    </syn-menu>
  </syn-dropdown>
</div>
```

---

## Submenus

To create a submenu, nest an <syn-menu slot="submenu"> element in a menu item.

```html
<div style="position: relative">
  <syn-dropdown placement="bottom-start">
    <syn-button
      slot="trigger"
      caret=""
      title=""
      variant="outline"
      size="medium"
      data-optional=""
      data-valid=""
      >Edit</syn-button
    >

    <syn-menu style="min-width: 240px" role="menu">
      <syn-menu-item
        value="undo"
        role="menuitem"
        aria-disabled="false"
        tabindex="0"
        >Undo</syn-menu-item
      >
      <syn-menu-item
        value="redo"
        role="menuitem"
        aria-disabled="false"
        tabindex="-1"
        >Redo</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item
        value="cut"
        role="menuitem"
        aria-disabled="false"
        tabindex="-1"
        >Cut</syn-menu-item
      >
      <syn-menu-item
        value="copy"
        role="menuitem"
        aria-disabled="false"
        tabindex="-1"
        >Copy</syn-menu-item
      >
      <syn-menu-item
        value="paste"
        role="menuitem"
        aria-disabled="false"
        tabindex="-1"
        >Paste</syn-menu-item
      >
      <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
        Find
        <syn-menu slot="submenu" role="menu">
          <syn-menu-item
            value="find"
            role="menuitem"
            aria-disabled="false"
            tabindex="0"
            >Find…</syn-menu-item
          >
          <syn-menu-item
            value="find-previous"
            role="menuitem"
            aria-disabled="false"
            tabindex="-1"
            >Find Next</syn-menu-item
          >
          <syn-menu-item
            value="find-next"
            role="menuitem"
            aria-disabled="false"
            tabindex="-1"
            >Find Previous</syn-menu-item
          >
        </syn-menu>
      </syn-menu-item>
      <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
        Transformations
        <syn-menu slot="submenu" role="menu">
          <syn-menu-item
            value="uppercase"
            role="menuitem"
            aria-disabled="false"
            tabindex="0"
            >Make uppercase</syn-menu-item
          >
          <syn-menu-item
            value="lowercase"
            role="menuitem"
            aria-disabled="false"
            tabindex="-1"
            >Make lowercase</syn-menu-item
          >
          <syn-menu-item
            value="capitalize"
            role="menuitem"
            aria-disabled="false"
            tabindex="-1"
            >Capitalize</syn-menu-item
          >
        </syn-menu>
      </syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</div>
```
