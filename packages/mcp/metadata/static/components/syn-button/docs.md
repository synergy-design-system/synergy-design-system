## Default

Buttons represent actions that are available to the user.

```html
<syn-button title="" variant="outline" size="medium"> Button </syn-button>
```

---

## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline and Text Buttons. Use the outline attribute to draw outlined buttons with transparent backgrounds. Use the text variant to create text buttons that share the same size as regular buttons but don’t have backgrounds or borders.

```html
<syn-button variant="filled" title="" size="medium">Filled</syn-button>
<syn-button variant="outline" title="" size="medium">Outline</syn-button>
<syn-button variant="text" title="" size="medium">Text</syn-button>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Sizes

Use the size attribute to change a button’s size.

```html
<syn-button size="small" title="" variant="outline">Small</syn-button>
<syn-button size="medium" title="" variant="outline">Medium</syn-button>
<syn-button size="large" title="" variant="outline">Large</syn-button>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Focus

The focus event gives the user feedback that the Button has been focused by the keyboard interaction and that the button component is ready for use.

```html
<div style="padding: 5px">
  <syn-button title="" variant="outline" size="medium">Default</syn-button>
</div>
```

---

## Link Buttons

It’s often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an under the hood. This gives you all the default link behavior the browser provides (e.g. CMD/CTRL/SHIFT + CLICK) and exposes the target and download attributes.

```html
<syn-button href="https://example.com/" title="" variant="outline" size="medium"
  >Link</syn-button
>
<syn-button
  href="https://example.com/"
  target="_blank"
  title=""
  variant="outline"
  size="medium"
  >New Window</syn-button
>
<syn-button
  href="/assets/images/wordmark.svg"
  download="synergy.svg"
  title=""
  variant="outline"
  size="medium"
  >Download</syn-button
>
<syn-button
  href="https://example.com/"
  disabled=""
  title=""
  variant="outline"
  size="medium"
  >Disabled</syn-button
>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Setting A Custom Width

As expected, buttons can be given a custom width by setting the width attribute. This is useful for making buttons span the full width of their container on smaller screens.

```html
<syn-button
  size="small"
  style="width: 100%; margin-bottom: 1rem"
  title=""
  variant="outline"
  >Small</syn-button
>
<syn-button
  size="medium"
  style="width: 100%; margin-bottom: 1rem"
  title=""
  variant="outline"
  >Medium</syn-button
>
<syn-button size="large" style="width: 100%" title="" variant="outline"
  >Large</syn-button
>
```

---

## Icon Only

Insert just a single icon to use the same button style.

```html
<syn-button size="small" variant="filled" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="small" title="" variant="outline">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="small" variant="text" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>

<br />

<syn-button size="medium" variant="filled" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="medium" title="" variant="outline">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="medium" variant="text" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>

<br />

<syn-button size="large" variant="filled" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="large" title="" variant="outline">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<syn-button size="large" variant="text" title="">
  <syn-icon
    name="settings"
    label="Settings"
    role="img"
    aria-label="Settings"
    library="default"
  ></syn-icon>
</syn-button>
<style>
  syn-button {
    margin: 10px 10px 0 0;
  }
</style>
```

---

## Prefix And Suffix Icons

Use the prefix and suffix slots to add icons.

```html
<syn-button size="small" title="" variant="outline">
  <syn-icon
    slot="prefix"
    name="settings"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Settings
</syn-button>

<syn-button size="small" title="" variant="outline">
  <syn-icon
    slot="suffix"
    name="refresh"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Refresh
</syn-button>

<syn-button size="small" title="" variant="outline">
  <syn-icon
    slot="prefix"
    name="link"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    slot="suffix"
    name="launch"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button title="" variant="outline" size="medium">
  <syn-icon
    slot="prefix"
    name="settings"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Settings
</syn-button>

<syn-button title="" variant="outline" size="medium">
  <syn-icon
    slot="suffix"
    name="refresh"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Refresh
</syn-button>

<syn-button title="" variant="outline" size="medium">
  <syn-icon
    slot="prefix"
    name="link"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    slot="suffix"
    name="launch"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button size="large" title="" variant="outline">
  <syn-icon
    slot="prefix"
    name="settings"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Settings
</syn-button>

<syn-button size="large" title="" variant="outline">
  <syn-icon
    slot="suffix"
    name="refresh"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Refresh
</syn-button>

<syn-button size="large" title="" variant="outline">
  <syn-icon
    slot="prefix"
    name="link"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    slot="suffix"
    name="launch"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Open
</syn-button>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Caret

Use the caret attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html
<syn-button size="small" caret="" title="" variant="outline">Small</syn-button>
<syn-button size="medium" caret="" title="" variant="outline"
  >Medium</syn-button
>
<syn-button size="large" caret="" title="" variant="outline">Large</syn-button>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Loading

Use the loading attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html
<syn-button variant="filled" loading="" title="" size="medium"
  >Filled</syn-button
>
<syn-button variant="outline" loading="" title="" size="medium"
  >Outline</syn-button
>
<syn-button variant="text" loading="" title="" size="medium">Text</syn-button>
<style>
  syn-button {
    margin: 0.2rem;
  }
</style>
```

---

## Disabled

Use the disabled attribute to disable a button.

```html
<syn-button variant="filled" disabled="" title="" size="medium"
  >Filled</syn-button
>
<syn-button variant="outline" disabled="" title="" size="medium"
  >Outline</syn-button
>
<syn-button variant="text" disabled="" title="" size="medium">Text</syn-button>
```
