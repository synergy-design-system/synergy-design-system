## Default

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.For a full list of icons that come bundled with Synergy, refer to the Assets.Note: To make the icon-button work in development, have a look at the icon documentation for how to set up the assets package.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  size="medium"
  color="currentColor"
></syn-icon-button>
```

---

## Sizes

Use the size attribute to change a icon-button size.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  size="small"
></syn-icon-button>
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  size="medium"
></syn-icon-button>
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  size="large"
></syn-icon-button>
```

---

## Colors

The Icon button can have two color variants, Primary or Neutral Color.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  size="medium"
></syn-icon-button>
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="primary"
  size="medium"
></syn-icon-button>
```

---

## Link Button

It’s often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an under the hood. This gives you all the default link behavior the browser provides (e.g. CMD/CTRL/SHIFT + CLICK) and exposes the target and download attributes.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  href="https://example.com"
  target="_blank"
  size="medium"
></syn-icon-button>
```

---

## Disabled

Use the disabled attribute to disable the icon button.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  disabled=""
  size="medium"
></syn-icon-button>
```

---

## Focus

The focus event gives the user feedback that the icon-button has been focused by the keyboard interaction.

```html
<div style="padding: 5px">
  <syn-icon-button
    name="wallpaper"
    label="Wallpaper"
    color="neutral"
    size="medium"
  ></syn-icon-button>
</div>
```

---

## Label

A description that gets read by assistive devices. For optimal accessibility, you have to include a label that describes what the icon button does.

```html
<div class="grid">
  <span>Unset label property: </span>
  <syn-icon-button
    name="wallpaper"
    color="neutral"
    size="medium"
  ></syn-icon-button>
  <span>Set label property: </span>
  <syn-icon-button
    name="wallpaper"
    label="Wallpaper"
    color="neutral"
    size="medium"
  ></syn-icon-button>
</div>
<style>
  .grid {
    font-size: var(--syn-font-size-x-small);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
</style>
```
