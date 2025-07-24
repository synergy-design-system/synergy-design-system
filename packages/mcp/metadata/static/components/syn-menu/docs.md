## Default

Menus provide a list of options for the user to choose from.You can use menu items, menu labels, and dividers to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html
<div style="width: 200px">
  <syn-menu role="menu">
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
    <syn-menu-item
      value="delete"
      role="menuitem"
      aria-disabled="false"
      tabindex="-1"
      >Delete</syn-menu-item
    >
  </syn-menu>
</div>
```

---

## In Dropdowns

Menus work really well when used inside dropdowns.

```html
<div style="position: relative">
  <syn-dropdown placement="bottom-start" open="">
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
    <syn-menu style="width: 200px" role="menu">
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
```

---

## Submenus

To create a submenu, nest an <syn-menu slot="submenu"> in any menu item.

```html
<syn-menu style="max-width: 200px" role="menu">
  <syn-menu-item value="undo" role="menuitem" aria-disabled="false" tabindex="0"
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

  <syn-menu-item value="cut" role="menuitem" aria-disabled="false" tabindex="-1"
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
</syn-menu>
```
