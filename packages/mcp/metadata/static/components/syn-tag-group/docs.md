## Default

A tag group is used to display multiple tags that belong together, often representing selected filters, categories, or user‑generated labels. It arranges tags in flexible rows and supports different sizes and layouts. Tags can be removable, icon based, or purely textual.

```html
<syn-tag-group label-position="top" size="medium">
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <span slot="label">This is a label</span>
</syn-tag-group>
```

---

## Sizes

Use the size attribute to change a tag group’s size.

```html
<syn-tag-group size="small" label="Small" label-position="top">
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="small">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
</syn-tag-group>

<syn-tag-group size="medium" label="Medium" label-position="top">
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
</syn-tag-group>

<syn-tag-group size="large" label="Large" label-position="top">
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="large">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
</syn-tag-group>
```

---

## Label Alignment

Change the label alignment to horizontal by using the horizontal alignment attribute.

```html
<syn-tag-group label="This is a label" label-position="start" size="medium">
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
  <syn-tag removable="" size="medium">
    <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
    Option
  </syn-tag>
</syn-tag-group>
```
