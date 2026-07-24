## Default

Buttons represent actions that are available to the user.

```html
<syn-button> Default </syn-button>
```

---

## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline and Text Buttons. Use the outline attribute to draw outlined buttons with transparent backgrounds. Use the text variant to create text buttons that share the same size as regular buttons but don’t have backgrounds or borders.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button variant="filled">Filled</syn-button>
  <syn-button variant="outline">Outline</syn-button>
  <syn-button variant="text">Text</syn-button>
</div>
```

---

## Sizes

Use the size attribute to change a button’s size.

```html
<div
  style="
    align-items: anchor-center;
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
  "
>
  <syn-button size="small">Small</syn-button>
  <syn-button size="medium">Medium</syn-button>
  <syn-button size="large">Large</syn-button>
</div>
```

---

## Focus

The focus event gives the user feedback that the Button has been focused by the keyboard interaction and that the button component is ready for use.

```html
<div style="padding: 5px">
  <syn-button>Default</syn-button>
</div>
```

---

## Link Buttons

It’s often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an under the hood. This gives you all the default link behavior the browser provides (e.g. CMD/CTRL/SHIFT + CLICK) and exposes the target and download attributes.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button href="https://example.com/">Link</syn-button>
  <syn-button href="https://example.com/" target="_blank"
    >New Window</syn-button
  >
  <syn-button href="/assets/images/wordmark.svg" download="synergy.svg"
    >Download</syn-button
  >
  <syn-button href="https://example.com/" disabled="">Disabled</syn-button>
</div>
```

---

## Setting A Custom Width

As expected, buttons can be given a custom width by setting the width attribute. This is useful for making buttons span the full width of their container on smaller screens.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-button size="small" style="width: 100%">Small</syn-button>
  <syn-button size="medium" style="width: 100%">Medium</syn-button>
  <syn-button size="large" style="width: 100%">Large</syn-button>
</div>
```

---

## Icon Only

Insert just a single icon to use the same button style.

```html
<div
  style="
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-small);
  "
>
  <syn-button size="small" variant="filled">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="small">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="small" variant="text">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
</div>

<div
  style="
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-small);
  "
>
  <syn-button size="medium" variant="filled">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="medium">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="medium" variant="text">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
</div>

<div
  style="
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-small);
  "
>
  <syn-button size="large" variant="filled">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="large">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
  <syn-button size="large" variant="text">
    <syn-icon name="settings" label="Settings"></syn-icon>
  </syn-button>
</div>
```

---

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

---

## Caret

Use the caret attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html
<div
  style="
    align-items: anchor-center;
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
  "
>
  <syn-button size="small" caret="">Small</syn-button>
  <syn-button size="medium" caret="">Medium</syn-button>
  <syn-button size="large" caret="">Large</syn-button>
</div>
```

---

## Loading

Use the loading attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button variant="filled" loading="">Filled</syn-button>
  <syn-button variant="outline" loading="">Outline</syn-button>
  <syn-button variant="text" loading="">Text</syn-button>
</div>
```

---

## Disabled

Use the disabled attribute to disable a button.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button variant="filled" disabled="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    Button
    <syn-icon name="wallpaper" slot="suffix"></syn-icon>
  </syn-button>

  <syn-button variant="outline" disabled="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    Button
    <syn-icon name="wallpaper" slot="suffix"></syn-icon>
  </syn-button>

  <syn-button variant="text" disabled="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    Button
    <syn-icon name="wallpaper" slot="suffix"></syn-icon>
  </syn-button>
</div>
```
