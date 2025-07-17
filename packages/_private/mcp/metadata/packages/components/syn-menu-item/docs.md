
## Default

Menu items provide options for the user to pick from in a menu.

```html
<syn-menu role="menu">
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0">
    Option 1
  </syn-menu-item>
</syn-menu>

```

---

## Prefix And Suffix

Add content to the start and end of menu items using the prefix and suffix slots.

```html
<syn-menu style="max-width: 240px" role="menu">
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0">
    <syn-icon
      slot="prefix"
      name="house"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Home
  </syn-menu-item>

  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
    <syn-icon
      slot="prefix"
      name="mail"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Messages
    <syn-icon
      slot="suffix"
      name="info"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-menu-item>

  <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>

  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1">
    <syn-icon
      slot="prefix"
      name="settings"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Settings
  </syn-menu-item>
</syn-menu>

```

---

## Disabled

Use the disabled attribute to disable an option and prevent it from being selected.

```html
<syn-menu style="max-width: 240px" role="menu">
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
    >Option 1</syn-menu-item
  >
  <syn-menu-item disabled="" role="menuitem" aria-disabled="true" tabindex="-1"
    >Option 2</syn-menu-item
  >
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
    >Option 3</syn-menu-item
  >
</syn-menu>

```

---

## Loading

Use the loading attribute to indicate that a menu item is busy. Like a disabled menu item, clicks will be suppressed until the loading state is removed.

```html
<syn-menu style="max-width: 240px" role="menu">
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
    >Option 1</syn-menu-item
  >
  <syn-menu-item loading="" role="menuitem" aria-disabled="false" tabindex="-1"
    >Option 2</syn-menu-item
  >
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
    >Option 3</syn-menu-item
  >
</syn-menu>

```

---

## Checkbox Menu Items

Set the type attribute to checkbox to create a menu item that will toggle on and off when selected. You can use the checked attribute to set the initial state.Checkbox menu items are visually indistinguishable from regular menu items. Their ability to be toggled is primarily inferred from context, much like you’d find in the menu of a native app.

```html
<syn-menu style="max-width: 240px" role="menu">
  <syn-menu-item
    type="checkbox"
    role="menuitemcheckbox"
    aria-checked="false"
    aria-disabled="false"
    tabindex="0"
    >Autosave</syn-menu-item
  >
  <syn-menu-item
    type="checkbox"
    checked=""
    role="menuitemcheckbox"
    aria-checked="true"
    aria-disabled="false"
    tabindex="-1"
    >Check Spelling</syn-menu-item
  >
  <syn-menu-item
    type="checkbox"
    role="menuitemcheckbox"
    aria-checked="false"
    aria-disabled="false"
    tabindex="-1"
    >Word Wrap</syn-menu-item
  >
</syn-menu>

```

---

## Value Selection

The value attribute can be used to assign a hidden value, such as a unique identifier, to a menu item. When an item is selected, the syn-select event will be emitted and a reference to the item will be available at event.detail.item. You can use this reference to access the selected item’s value, its checked state, and more.

```html
<syn-menu class="menu-value" style="max-width: 200px" role="menu">
  <syn-menu-item
    value="opt-1"
    role="menuitem"
    aria-disabled="false"
    tabindex="0"
    >Option 1</syn-menu-item
  >
  <syn-menu-item
    value="opt-2"
    role="menuitem"
    aria-disabled="false"
    tabindex="-1"
    >Option 2</syn-menu-item
  >
  <syn-menu-item
    value="opt-3"
    role="menuitem"
    aria-disabled="false"
    tabindex="-1"
    >Option 3</syn-menu-item
  >
  <syn-divider role="separator" aria-orientation="horizontal"></syn-divider>
  <syn-menu-item
    type="checkbox"
    value="opt-4"
    checked=""
    role="menuitemcheckbox"
    aria-checked="true"
    aria-disabled="false"
    tabindex="-1"
    >Checkbox 4</syn-menu-item
  >
  <syn-menu-item
    type="checkbox"
    value="opt-5"
    role="menuitemcheckbox"
    aria-checked="false"
    aria-disabled="false"
    tabindex="-1"
    >Checkbox 5</syn-menu-item
  >
  <syn-menu-item
    type="checkbox"
    value="opt-6"
    role="menuitemcheckbox"
    aria-checked="false"
    aria-disabled="false"
    tabindex="-1"
    >Checkbox 6</syn-menu-item
  >
</syn-menu>

```
