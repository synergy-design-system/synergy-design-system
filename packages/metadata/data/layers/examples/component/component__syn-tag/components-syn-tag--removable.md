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
