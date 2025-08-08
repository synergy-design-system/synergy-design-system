## Default

Tags are used as labels to organize things or to indicate a selection.

```html
<syn-tag size="medium"> Option </syn-tag>
```

---

## With Icon

```html
<syn-tag size="medium">
  <syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
  Option
</syn-tag>
```

---

## Removable

Use the removable attribute to add a remove button to the tag.

```html
<div class="tags-removable">
  <syn-tag size="small" removable="">Small</syn-tag>
  <syn-tag size="medium" removable="">Medium</syn-tag>
  <syn-tag size="large" removable="">Large</syn-tag>
</div>

<style>
  .tags-removable syn-tag {
    transition: var(--syn-transition-medium) opacity;
  }
</style>
```

---

## Sizes

Use the size attribute to change a tab’s size.

```html
<syn-tag size="small">Small</syn-tag>
<syn-tag size="medium">Medium</syn-tag>
<syn-tag size="large">Large</syn-tag>
```
