## Default

Tags are used as labels to organize things or to indicate a selection.

```html
<syn-tag> Option </syn-tag>
```

---

## With Icon

```html
<syn-tag>
  <syn-icon name="wallpaper"></syn-icon>
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

<script type="module">
  const div = document.querySelector(".tags-removable");

  div.addEventListener("syn-remove", (event) => {
    const tag = event.target;
    tag.style.opacity = "0";
    setTimeout(() => (tag.style.opacity = "1"), 2000);
  });
</script>

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
